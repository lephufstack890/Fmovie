<?php

use App\Models\Voucher;
use App\Models\Trailers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\GenreController;
use App\Http\Controllers\api\RoomsController;
use App\Http\Controllers\api\SeatsController;
use App\Http\Controllers\api\CinemaController;
use App\Http\Controllers\api\MoviesController;
use App\Http\Controllers\api\TicketsController;
use App\Http\Controllers\api\VoucherController;
use App\Http\Controllers\api\CategoryController;
use App\Http\Controllers\api\DayMoviesController;
use App\Http\Controllers\api\TrailersController;
use App\Http\Controllers\api\SeatsTypeController;
use App\Http\Controllers\api\ShowtimesController;
use App\Http\Controllers\api\TimeShowsController;
use App\Http\Controllers\api\TransactionController;
use App\Http\Resources\TransactionVoucherLinkResource;
use App\Http\Controllers\api\TransactionVoucherLinkController;
use App\Http\Controllers\api\UploadImageController;
use App\Http\Controllers\api\VNPayController;
use App\Models\DayMovies;
use App\Models\Movies;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class,'user']);
    Route::get('/logout', [AuthController::class,'logout']);
});

Route::post('/login', [AuthController::class,'login']);
Route::post('/register', [AuthController::class,'register']);

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::resource('cinema', CinemaController::class);
Route::resource('voucher',VoucherController::class);
Route::resource('category',CategoryController::class);
Route::resource('movies',MoviesController::class);
Route::resource('daymovies',DayMoviesController::class);
Route::get('/movies_search', [MoviesController::class, 'search']);  // tìm kiếm theo name
Route::get('/movies/filter-by-category/{categoryName}', [MoviesController::class, 'filterByCategory']); // lọc phim theo danh mục
Route::get('/movies/filter-by-status/{status}', [MoviesController::class, 'filterByStatus']);
Route::get('/movies/filter/{id}', [MoviesController::class, 'filterByDate']); // lọc theo ngày chiếu
Route::post('tickets/book', [TicketsController::class, 'bookTicket']); // Đặt vé tạm thời bỏ
Route::post('/select-seat', [SeatsController::class, 'chooseSeat']); // chọn ghế
Route::resource('trailers',TrailersController::class);
Route::resource('showtimes',ShowtimesController::class);
Route::resource('timeshows',TimeShowsController::class);
Route::resource('transactionvoucher',TransactionVoucherLinkController::class);
Route::resource('rooms',RoomsController::class);
Route::resource('seats',SeatsController::class);
Route::resource('seatstype',SeatsTypeController::class);
Route::resource('tickets',TicketsController::class);
Route::post('upload/file',[UploadImageController::class, 'upload']);
// Route::post('payment/update',[TransactionController::class, 'UpdatePayment']);

Route::get('/get_all_transaction', [VNPayController::class, 'get_all_transaction']);
Route::delete('/delete_transaction/{id}', [VNPayController::class, 'destroy']);
Route::post('/payment', [VNPayController::class, 'index']);
Route::post('/vnpay/callback', [VNPayController::class, 'callback'])->name('vnpay.callback');
