<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thanh toán thành công!</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid black;
            padding: 5px;
        }
    </style>
</head>
<body>
    <h1 style="color: green;">Thanh toán thành công!</h1>
    <table>
        <tr>
            <td><strong>Số lượng:</strong></td>
            <td>{{ $totalQuantity }}</td>
        </tr>
        <tr>
            <td><strong>Hình thức:</strong></td>
            <td>{{ $paymentMethod }}</td>
        </tr>
        <tr>
            <td><strong>Thời gian:</strong></td>
            <td>{{ $time }}</td>
        </tr>
        <tr>
            <td><strong>Trạng thái:</strong></td>
            <td>{{ $paymentStatus }}</td>
        </tr>
        <tr>
            <td><strong>Tổng thanh toán:</strong></td>
            <td>{{ number_format($totalPayment, 0, ',', '.') . 'đ' }}</td>
        </tr>
    </table>
</body>
</html>
