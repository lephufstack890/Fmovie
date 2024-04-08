<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thanh toán thành công!</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th,
        td {
            border: 1px solid #dddddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        .title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
            text-align: center;
        }

        .details {
            margin-bottom: 20px;
        }

        .details td {
            font-weight: bold;
            width: 30%;
        }

        .details td:nth-child(2) {
            width: 70%;
        }

        /* CSS cho trạng thái chưa thanh toán */
        .payment-status-unpaid {
            color: red;
        }

        /* CSS cho trạng thái đã thanh toán */
        .payment-status-paid {
            color: green;
        }
    </style>
</head>

<body>
    <div class="container">
        <h2 class="title">
            <?= $paymentStatus == 'Chưa thanh toán' ? 'Trạng thái thanh toán đang chờ duyệt' : 'Thanh toán thành công' ?>
        </h2>
        <table class="details">
            <tr>
                <td>Mã đơn:</td>
                <td>{{ $order_code }}</td>
            </tr>
            <tr>
                <td>Tên rạp:</td>
                <td>{{ $name_cinemas }}</td>
            </tr>
            <tr>
                <td>Tên phim:</td>
                <td>{{ $name_movie }}</td>
            </tr>
            <tr>
                <td>Tên phòng:</td>
                <td>{{ $name_room }}</td>
            </tr>
            <tr>
                <td>Tên ghế đã đặt:</td>
                <td>
                    @php
                        $seatsArray = json_decode($seats, true);
                    @endphp
                    @foreach ($seatsArray as $seat)
                        {{ $seat }}<br>
                    @endforeach
                </td>
            </tr>
            <tr>
                <td>Số lượng:</td>
                <td>{{ $totalQuantity }}</td>
            </tr>
            <tr>
                <td>Hình thức:</td>
                <td>{{ $paymentMethod }}</td>
            </tr>
            <tr>
                <td>Thời gian:</td>
                <td>{{ $time }}</td>
            </tr>
            <tr>
                <td>Trạng thái:</td>
                <td class="@if ($paymentStatus == 'Chưa thanh toán') payment-status-unpaid @else payment-status-paid @endif">
                    <?= $paymentStatus == "Chưa thanh toán" ? "Đang chờ duyệt" : "Đã thanh toán" ?>
                </td>
            </tr>
            <tr>
                <td>Tổng thanh toán:</td>
                <td>{{ number_format($totalPayment, 0, ',', '.') . 'đ' }}</td>
            </tr>
        </table>
    </div>
</body>

</html>
