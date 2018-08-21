<?php
if ( empty($_GET['name']) || empty($_GET['email']) || empty($_GET['personal']) || empty($_GET['companies']) ) {
  echo json_response('Форма заполнена некорректно', 400);
  die;
}

function json_response($message = null, $code = 200) {
  header_remove();
  http_response_code($code);
  header("Cache-Control: no-transform,public,max-age=300,s-maxage=900");
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: digit-it.ru');

  $status = array(
    200 => '200 OK',
    400 => '400 Bad Request',
    422 => 'Unprocessable Entity',
    500 => '500 Internal Server Error'
  );
  header('Status: ' . $status[$code]);
  return json_encode(array(
    'status' => $code < 300,
    'message' => $message
    )
  );
}

if ( $_GET['companies'] === 'true' ) {
  echo json_response('Форма отправлена');
  die;
};

$to = 'sales@digit-it.ru';
$subject = 'Сообщение с сайта';

$name = $_GET['name'];
$email = $_GET['email'];
$phone = $_GET['phone'];
$message = $_GET['message'];
$personal = $_GET['personal'];
$companies = $_GET['companies'];

$headers = "From: postmaster@digit-it.ru\n";

$message = "Имя: $name\nE-mail: $email\nТелефон: $phone\nСообщение: $message\n";

echo json_response('Форма отправлена');
mail($to, $subject, $message, $headers);
?>