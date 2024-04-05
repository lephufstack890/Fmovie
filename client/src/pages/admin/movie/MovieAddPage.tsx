import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { toastError, toastSuccess } from "@/hook/Toast"
import { addNewMovie } from "@/services/movies/moviesSlices"
import { useAddMoviesMutation } from "@/services/movies/movies.services"
import {
  useGetCategoryListQuery,
} from "@/services/categories/categories.services"
import { loadCategoryList } from "@/services/categories/categoriesSlices"
import {
  useGetTrailerListQuery,
} from "@/services/trailer/trailers.services"
import { loadTrailerList } from "@/services/trailer/trailersSlices"
import {
  useGetTimeShowListQuery,
} from "@/services/timeshow/timeshows.services"
import { loadTimeShowList } from "@/services/timeshow/timeshowsSlices"
import {
  useGetDayMovieListQuery,
} from "@/services/daymovie/daymovies.services"
import { loadDayMovieList } from "@/services/daymovie/daymoviesSlices"


const MovieAddPage = () => {

  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [addMovieMutation, {isLoading}] = useAddMoviesMutation()

  const handleSelectTimeShowChange = (event) => {
    const selectedValue = event.target.value
    const selectedTimeShow = timeshowState?.find((timeshow) => timeshow.id == selectedValue)
    if (selectedTimeShow && !selectedTimes.includes(selectedTimeShow.id)) {
      setSelectedTimes((prevItems) => [...prevItems, selectedTimeShow.id])
    }
  };
  const handleRemoveTimeShow = (selectedItemId) => {
    setSelectedTimes((prevItems) => prevItems.filter((itemId) => itemId !== selectedItemId))
  }

  const handleSelectDayMovieChange = (event) => {
    const selectedValue = event.target.value
    const selectedDayMovie = daymovieState?.find((daymovie) => daymovie.id == selectedValue)
    if (selectedDayMovie && !selectedDays.includes(selectedDayMovie.id)) {
      setSelectedDays((prevItems) => [...prevItems, selectedDayMovie.id])
    }
  };
  const handleRemoveDayMovie = (selectedItemId) => {
    setSelectedDays((prevItems) => prevItems.filter((itemId) => itemId !== selectedItemId))
  }

  const categoryState = useAppSelector(
    (state) => state.categories.categories
  );
  const {
    data: category,
    isSuccess: isCategoryListSuccess,
  } = useGetCategoryListQuery([]);
  useEffect(() => {
    dispatch(loadCategoryList(category?.data));
  }, [isCategoryListSuccess])

  const trailerState = useAppSelector(
    (state) => state.trailers.trailers
  );
  const {
    data: trailer,
    isSuccess: isTrailerListSuccess,
  } = useGetTrailerListQuery([]);
  useEffect(() => {
    dispatch(loadTrailerList(trailer?.data));
  }, [isTrailerListSuccess])

  const timeshowState = useAppSelector(
    (state) => state.timeshows.timeshows
  );
  const {
    data: timeshow,
    isSuccess: isTimeShowListSuccess,
  } = useGetTimeShowListQuery([]);
  useEffect(() => {
    dispatch(loadTimeShowList(timeshow?.data));
  }, [isTimeShowListSuccess])

  const daymovieState = useAppSelector(
    (state) => state.daymovies.daymovies
  );
  const {
    data: daymovie,
    isSuccess: isDayMovieListSuccess,
  } = useGetDayMovieListQuery([]);
  useEffect(() => {
    dispatch(loadDayMovieList(daymovie?.data));
  }, [isDayMovieListSuccess])


  const FormSchema = z.object({
    name: z.string(),
    description: z.string(),
    status: z.string(),
    time: z.string(),
    director: z.string(),
    actor: z.string(),
    releaseDate: z.string(),
    language: z.string(),
    image: z.string(),
    id_category: z.string(),
    id_trailer: z.string(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "",
      time: "",
      director: "",
      actor: "",
      releaseDate: "",
      language: "",
      image: "",
      id_category: "",
      id_trailer: "",
    },
  })


  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formData = {
      name: data.name,
      description: data.description,
      status: data.status,
      time: data.time,
      director: data.director,
      actor: data.actor,
      releaseDate: data.releaseDate,
      language: data.language,
      image: data.image,
      id_category: data.id_category,
      id_trailer: data.id_trailer,
      id_time: selectedTimes,
      id_day_movie: selectedDays,
    }
    try {
      await addMovieMutation(formData).unwrap().then(() => {
        dispatch(addNewMovie(formData))
      }).then(() => {
        toastSuccess('Thêm phim thành công')
      }).then(() => {
        navigate('/admin/movie')
      })
    } catch (error:unknown) {
      toastError('Thêm phim thất bại!')
    }
  };

  return (
    <>
      <div  className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl ">
          <h1  className="mb-6 text-xl font-semibold lg:text-2xl">Thêm phim</h1>

            <div  className="grid gap-3 md:grid-cols-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên phim</FormLabel>
                    <FormControl>
                      <Input placeholder="Quật mộ trùng ma..." className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div  className="grid gap-3 md:grid-cols-1">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea placeholder="" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-3 lg:grid-cols-1">
              <FormField
                control={form.control}
                name="id_category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thể loại phim</FormLabel>
                    <FormControl>
                      <select {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Chọn thể loại</option>
                        {categoryState?.map((item, index) => (
                          <option key={index} value={item?.id}>
                            {item?.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div  className="grid gap-3 md:grid-cols-1">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái</FormLabel>
                    <FormControl>
                      <select {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option selected>Chọn trạng thái</option>
                          <option value="Phim sắp chiếu">Phim sắp chiếu</option>
                          <option value="Phim đang chiếu">Phim đang chiếu</option>
                          <option value="Suất chiếu đặc biệt">Suất chiếu đặc biệt</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div  className="grid gap-3 md:grid-cols-1">
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thời lượng phim</FormLabel>
                    <FormControl>
                      <Input placeholder="Bộ phim có thời lượng 120 phút thì nhập 120" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div  className="grid gap-3 md:grid-cols-1">
              <FormField
                control={form.control}
                name="director"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giám đốc bộ phim</FormLabel>
                    <FormControl>
                      <Input placeholder="Jang Jae Hyun..." className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div  className="grid gap-3 md:grid-cols-1">
              <FormField
                control={form.control}
                name="actor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diễn viên</FormLabel>
                    <FormControl>
                      <Input placeholder="Choi Min Sik, Yoo Hai Jin, Kim Go Eun, Lee Do Hyun..." className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div  className="grid gap-3 md:grid-cols-1">
              <FormField
                control={form.control}
                name="releaseDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày bộ phim ra mắt</FormLabel>
                    <FormControl>
                      <Input type="date" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div  className="grid gap-3 md:grid-cols-1">
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngôn ngữ</FormLabel>
                    <FormControl>
                      <Input placeholder="Tiếng hàn" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div  className="grid gap-3 md:grid-cols-1">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ảnh đại diện</FormLabel>
                    <FormControl>
                      <Input placeholder="https://files.betacorp.vn/media%2fimages%2f2024%2f.." className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-3 lg:grid-cols-1">
              <FormField
                control={form.control}
                name="id_trailer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Link đoạn video ngắn giới thiệu</FormLabel>
                    <FormControl>
                      <select {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Chọn link video</option>
                        {trailerState?.map((item, index) => (
                          <option key={index} value={item?.id}>
                            {item?.url}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-3 lg:grid-cols-1">
                  <FormLabel className="block text-sm font-medium text-gray-900 dark:text-white">Thời gian chiếu (Nếu bạn muốn bỏ thời gian đó thì nhấp chuột vào chính thời đó. Ví dụ: bỏ 21:00 thì nhấp chuột vào "21:00")</FormLabel>
                  <div style={{ display: 'flex' }}>
                    {selectedTimes?.map((selectedTimesId, index) => {
                      const selectedTimeShow = timeshowState?.find(
                        (timeshow) => timeshow.id == selectedTimesId
                      )
                      return ( 
                        <div 
                          key={index} 
                          style={{ margin: '0 8px', padding: '4px 12px', background: '#ccc', borderRadius: '6px' }}
                          onClick={() => handleRemoveTimeShow(selectedTimeShow?.id)}
                        >
                            {selectedTimeShow?.name}
                        </div>
                      )
                    })}
                  </div>
                  <FormControl>
                      <select onChange={handleSelectTimeShowChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Chọn thời gian chiếu</option>
                        {timeshowState?.map((item, index) => (
                          <option key={index} value={item?.id}>
                            {item?.name}
                          </option>
                        ))}
                      </select>
                  </FormControl>
            </div>

            <div className="grid gap-3 lg:grid-cols-1">
                <FormLabel className="block text-sm font-medium text-gray-900 dark:text-white">Ngày phim chiếu (Nếu bạn muốn bỏ ngày đó thì nhấp chuột vào chính ngày đó. Ví dụ: bỏ ngày 6 thì nhấp chuột vào "Ngày 6")</FormLabel>
                    <div style={{ display: 'flex' }}>
                      {selectedDays?.map((selectedDaysId, index) => {
                        const selectedDayMovie = daymovieState?.find(
                          (daymovie) => daymovie.id == selectedDaysId
                        )
                        return ( 
                          <div 
                            key={index} 
                            style={{ margin: '0 8px', padding: '4px 12px', background: '#ccc', borderRadius: '6px' }}
                            onClick={() => handleRemoveDayMovie(selectedDayMovie?.id)}
                          >
                              Ngày {selectedDayMovie?.day}
                          </div>
                        )
                      })}
                    </div>
                    <FormControl>
                      <select onChange={handleSelectDayMovieChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Chọn ngày chiếu</option>
                        {daymovieState?.map((item, index) => (
                          <option key={index} value={item?.id}>
                            {item?.day}
                          </option>
                        ))}
                      </select>
                  </FormControl>
            </div>

            <div>
              <Button type="submit" className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white">Xác Nhận Thêm</Button>
            </div>
        </form>
        </Form>
      </div>
    </>
  )
}

export default MovieAddPage