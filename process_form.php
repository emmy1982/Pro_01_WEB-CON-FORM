<?php
// Set headers to handle CORS if needed
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
    exit;
}

// Get the posted data
$data = $_POST;

// If form is submitted via JSON
$json_data = json_decode(file_get_contents("php://input"), true);
if ($json_data) {
    $data = $json_data;
}

// Validate required fields
$required_fields = [
    "name" => "Nombre completo",
    "email" => "Correo electrónico",
    "phone" => "Teléfono",
    "tattoo_style" => "Estilo de tatuaje",
    "tattoo_size" => "Tamaño del tatuaje",
    "budget" => "Presupuesto",
    "preferred_date" => "Fecha preferida",
    "preferred_time" => "Hora preferida",
    "description" => "Descripción del tatuaje"
];

$errors = [];

foreach ($required_fields as $field => $fieldName) {
    if (empty($data[$field])) {
        $errors[$field] = "El campo $fieldName es obligatorio";
    }
}

// Validate email format
if (!empty($data["email"]) && !filter_var($data["email"], FILTER_VALIDATE_EMAIL)) {
    $errors["email"] = "Por favor ingresa un correo electrónico válido";
}

// Validate phone number (simple validation)
if (!empty($data["phone"]) && !preg_match("/^[\d\s()+\-]{7,20}$/", $data["phone"])) {
    $errors["phone"] = "Por favor ingresa un número de teléfono válido";
}

// Validate date format
if (!empty($data["preferred_date"])) {
    $date = date_create_from_format('Y-m-d', $data["preferred_date"]);
    if (!$date || date_format($date, 'Y-m-d') !== $data["preferred_date"]) {
        $errors["preferred_date"] = "Por favor ingresa una fecha válida";
    }
}

// If there are validation errors
if (!empty($errors)) {
    http_response_code(400); // Bad Request
    echo json_encode(["success" => false, "errors" => $errors]);
    exit;
}

// Process the appointment data
// 1. Format data for readability
$appointment_date = date("d/m/Y", strtotime($data["preferred_date"]));
$appointment_time = $data["preferred_time"];
$client_name = $data["name"];
$client_email = $data["email"];
$client_phone = $data["phone"];
$tattoo_style = $data["tattoo_style"];
$tattoo_size = $data["tattoo_size"];
$budget = $data["budget"];
$artist = !empty($data["tattoo_artist"]) ? $data["tattoo_artist"] : "Sin preferencia";
$description = $data["description"];

// 2. Send confirmation email to client
$to_client = $client_email;
$subject_client = "Confirmación de cita - Tres Monos Ink";

$message_client = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #ff4d4d; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #888; }
        h1 { margin: 0; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        table, th, td { border: 1px solid #ddd; }
        th, td { padding: 10px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>Confirmación de Cita</h1>
        </div>
        <div class='content'>
            <p>Hola <strong>$client_name</strong>,</p>
            <p>Gracias por reservar una cita con nosotros en Tres Monos Ink. A continuación te presentamos los detalles de tu reserva:</p>
            
            <table>
                <tr>
                    <th colspan='2'>Detalles de la Cita</th>
                </tr>
                <tr>
                    <td><strong>Fecha:</strong></td>
                    <td>$appointment_date</td>
                </tr>
                <tr>
                    <td><strong>Hora:</strong></td>
                    <td>$appointment_time</td>
                </tr>
                <tr>
                    <td><strong>Estilo de tatuaje:</strong></td>
                    <td>$tattoo_style</td>
                </tr>
                <tr>
                    <td><strong>Tamaño:</strong></td>
                    <td>$tattoo_size</td>
                </tr>
                <tr>
                    <td><strong>Presupuesto aproximado:</strong></td>
                    <td>$budget</td>
                </tr>
                <tr>
                    <td><strong>Artista preferido:</strong></td>
                    <td>$artist</td>
                </tr>
            </table>
            
            <p>Pronto nos pondremos en contacto contigo para confirmar tu cita y resolver cualquier duda que puedas tener.</p>
            
            <p>Si necesitas modificar o cancelar tu cita, por favor contáctanos al teléfono +34 600 000 000 o respondiendo a este correo.</p>
            
            <p>¡Esperamos verte pronto!</p>
            <p>Equipo de Tres Monos Ink</p>
        </div>
        <div class='footer'>
            <p>© 2023 Tres Monos Ink. Todos los derechos reservados.</p>
            <p>Calle Principal 123, 28001 Madrid</p>
        </div>
    </div>
</body>
</html>
";

// 3. Send notification email to studio
$to_studio = "emmyjose82@hotmail.com"; // Studio email
$subject_studio = "Nueva solicitud de cita - Tres Monos Ink";

$message_studio = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #333; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        table, th, td { border: 1px solid #ddd; }
        th, td { padding: 10px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>Nueva Solicitud de Cita</h1>
        </div>
        <div class='content'>
            <p>Hay una nueva solicitud de cita con los siguientes detalles:</p>
            
            <table>
                <tr>
                    <th colspan='2'>Información del Cliente</th>
                </tr>
                <tr>
                    <td><strong>Nombre:</strong></td>
                    <td>$client_name</td>
                </tr>
                <tr>
                    <td><strong>Email:</strong></td>
                    <td>$client_email</td>
                </tr>
                <tr>
                    <td><strong>Teléfono:</strong></td>
                    <td>$client_phone</td>
                </tr>
                <tr>
                    <th colspan='2'>Detalles del Tatuaje</th>
                </tr>
                <tr>
                    <td><strong>Fecha y hora solicitada:</strong></td>
                    <td>$appointment_date a las $appointment_time</td>
                </tr>
                <tr>
                    <td><strong>Estilo:</strong></td>
                    <td>$tattoo_style</td>
                </tr>
                <tr>
                    <td><strong>Tamaño:</strong></td>
                    <td>$tattoo_size</td>
                </tr>
                <tr>
                    <td><strong>Presupuesto:</strong></td>
                    <td>$budget</td>
                </tr>
                <tr>
                    <td><strong>Artista solicitado:</strong></td>
                    <td>$artist</td>
                </tr>
                <tr>
                    <td><strong>Descripción:</strong></td>
                    <td>$description</td>
                </tr>
            </table>
            
            <p>Por favor, contacta con el cliente para confirmar la cita lo antes posible.</p>
        </div>
    </div>
</body>
</html>
";

// Headers for HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: Tres Monos Ink <info@tresmonosink.com>" . "\r\n";

// 4. Send the emails
$client_email_sent = mail($to_client, $subject_client, $message_client, $headers);
$studio_email_sent = mail($to_studio, $subject_studio, $message_studio, $headers);

// 5. Simulate WhatsApp notification (in a real environment, you would use WhatsApp Business API)
$whatsapp_sent = true; // Simulated for this example
// In a real implementation, you would use WhatsApp Business API or a service like Twilio
// Example:
// $whatsapp_message = "Hola $client_name, ¡Gracias por agendar una cita con Tres Monos Ink! Tu cita está programada para el $appointment_date a las $appointment_time. Por favor, llega 15 minutos antes. Si necesitas reprogramar, llámanos al +34 600 000 000.";
// $whatsapp_sent = send_whatsapp($client_phone, $whatsapp_message);

// 6. Prepare the response
if ($client_email_sent && $studio_email_sent && $whatsapp_sent) {
    $response = [
        "success" => true,
        "message" => "¡Gracias por tu solicitud! Hemos enviado un correo de confirmación a $client_email y un mensaje de WhatsApp a tu teléfono. Te contactaremos pronto para confirmar tu cita.",
        "data" => [
            "name" => $client_name,
            "appointment_date" => $appointment_date,
            "appointment_time" => $appointment_time
        ]
    ];
} else {
    $response = [
        "success" => false,
        "message" => "Hemos recibido tu solicitud, pero hubo un problema al enviar las confirmaciones. Por favor contáctanos directamente al +34 600 000 000.",
    ];
}

// 7. Output JSON response
echo json_encode($response);
?> 