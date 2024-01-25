class ResponseStatus {
  success = 200;
  error = 500;
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
}

export { ResponseMassages, ResponseStatus, Message };
