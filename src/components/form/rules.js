function email(message) {
  if (!message) {
    message = "Invalid email address format.";
  }

  return /^\w+([.\-+]?\w+)*\+*@\w+([.-]?\w+)*(\.\w{2,24})+$/.test(message);
}

function phone(message) {
  if (!message) {
    message = "Invalid phone number format";
  }

  return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(
    message
  );
}

function matches(object, propertyPath, message) {}

function maxLength(length, message) {
  if (!message) {
    message = `Max ${length} characters allowed.`;
  }

  return message && message.length > length ? message : true;
}

function minLength(length, message) {
  if (!message) {
    message = `Min ${length} characters allowed.`;
  }

  return message && message.length < length ? message : true;
}

function required(message) {
  console.log(message);
  if (!message) {
    return "This field is required.";
  }

  return true;
}

function username(message) {
  if (!message) {
    message = "Only letters, numbers and underscore are allowed.";
  }

  return /^[a-zA-Z0-9_]+$/.test(message) ? true : message;
}

export { email, phone, matches, maxLength, minLength, required, username };
