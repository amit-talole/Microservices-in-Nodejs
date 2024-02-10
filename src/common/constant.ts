class ResponseStatus {
  success = 200;
  error = 500;
  unauthorized=401;
  fail=400
  not_found=404
  bad_request=401
  too_many_request=429
}
class ResponseMassages {
  success = 'success';
  fail = 'fail';
  error = 'error';
  unauthorized = 'unauthorized';
  not_found = 'not_found';
  bad_request = 'bad_request';
  too_many_request = 'too_many_request';
}

class Message {
  someting_went_wrong = 'something went to wrong ';
  invalidParameter='invalid parameter'
}

export { ResponseMassages, ResponseStatus, Message };
