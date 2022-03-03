from flask import Flask, redirect, request, send_file, send_from_directory, url_for
from werkzeug.utils import secure_filename
from json import loads, dumps
from uuid import uuid4
from os.path import splitext
from google.cloud import storage
storage_client = storage.Client()
bucket_name = "cruddyxyz-bucket"
bucket = storage_client.bucket(bucket_name)

def uploadToBucket(stream, source_file_name, content_type):
    blob = bucket.blob(source_file_name)
    blob.upload_from_file(stream, content_type=content_type)
    # blob.upload_from_filename(source_file_name)
    # blob.make_public()
    return blob.public_url

def grabFromBucket(source_file_name):
    # blob = bucket.blob(source_file_name)
    blob = bucket.get_blob(source_file_name)
    try:
        return blob.media_link
    except AttributeError:
        return None

def deleteFromBucket(source_file_name):
    blob = bucket.get_blob(source_file_name)
    blob.delete()

app = Flask(__name__)

## Index
@app.route("/<path:name>", methods=["GET"])
def index(name):
    return send_from_directory("out", name)

@app.route("/")
def home():
    return redirect("/index.html")

## Uploading
@app.route("/upload", methods = ["GET", "POST"])
def upload():
    if request.method == "POST":
        type = request.files['file']
        extension = splitext(type.filename)[1]
        with open("./uploads/images.json") as f:
            images = loads(f.read())
            name = [secure_filename(f"{uuid4()}{extension}"), str(uuid4())]
            for imgname, uuid in images["images"]:
                if name[0] in imgname:
                    name[0] = secure_filename(f"{str(uuid4())}{extension}")
                if name[1] in uuid:
                    name[1] = str(uuid4())
            images["images"].append(name)
        with open("./uploads/images.json", mode="w") as f:
            f.write(dumps(images))
        print(name[0])
        uri = uploadToBucket(type.stream, name[0], type.content_type)
        # type.save(f"./uploads/{name[0]}")
        return dumps({
            "FullURL": f"{uri}",
            "image": name[0],
            "uuid": name[1]
        })
    else:
        return "POST an image to this URL"

## Deleting

@app.route("/delete", methods=["GET", "POST"])
def deleteviaGET():
    deletionUUID = request.args.get("deletionUUID")
    if deletionUUID == "begin":
        return 'Nothing Deleted, incorrect UUID'
    with open("./uploads/images.json") as f:
        images = loads(f.read())
        print(deletionUUID)
        for uuid in enumerate(images["images"]):
            print(uuid)
        # return 'ur mom'
            if uuid[1][1] == deletionUUID:
                print('deleted')
                # remove(f"./uploads/{uuid[1][0]}")
                deleteFromBucket(uuid[1][0])
                images["images"].pop(uuid[0])
                with open("./uploads/images.json", mode="w") as f:
                    f.write(dumps(images))
                
                return f'deleted: {deletionUUID}'
    return 'Nothing Deleted, incorrect UUID'

@app.route("/delete/<deletionUUID>", methods=["GET"])
def delete(deletionUUID):
    if deletionUUID == "begin":
        return 'Nothing Deleted, incorrect UUID'
    with open("./uploads/images.json") as f:
        images = loads(f.read())
        print(deletionUUID)
        for uuid in enumerate(images["images"]):
            print(uuid)
        # return 'ur mom'
            if uuid[1][1] == deletionUUID:
                print('deleted')
                # remove(f"./uploads/{uuid[1][0]}")
                deleteFromBucket(uuid[1][0])
                images["images"].pop(uuid[0])
                with open("./uploads/images.json", mode="w") as f:
                    f.write(dumps(images))
                
                return f'deleted: {deletionUUID}'
    return 'Nothing Deleted, incorrect UUID'

@app.route("/view/<filename>", methods=["GET"])
def getFile(filename):
    if filename != "images.json":
        # return send_file(f"./uploads/{secure_filename(filename)}")
        return f"<img src='{grabFromBucket(filename)}' />"
    else:
        return "no"

@app.route("/uploads/<filename>")
def getLink(filename):
    if filename != "images.json":
        # return send_file(f"./uploads/{secure_filename(filename)}")
        return redirect(grabFromBucket(filename))
    else:
        return "no"
