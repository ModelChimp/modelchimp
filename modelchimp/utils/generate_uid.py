import hashlib
import time
from uuid import uuid4
from base64 import b64encode

def generate_uid():
  t = b64encode(str(time.time()).encode('utf-8'))
  r = b64encode(str(uuid4()).encode('utf-8'))
  return hashlib.sha256(t + r).hexdigest()
