import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from 'react';
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
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from 'react'
import { toastError, toastSuccess } from "@/hook/Toast"
import { editNewMovie } from "@/services/movies/moviesSlices"
import { useEditMoviesMutation, useGetMoviesQuery, useUploadImageMutation } from "@/services/movies/movies.services"
import {
  useGetTrailerListQuery,
} from "@/services/trailer/trailers.services"
import { loadTrailerList } from "@/services/trailer/trailersSlices"
import {
  useGetCategoryListQuery,
} from "@/services/categories/categories.services"
import { loadCategoryList } from "@/services/categories/categoriesSlices"
import {
  useGetTimeShowListQuery,
} from "@/services/timeshow/timeshows.services"
import { loadTimeShowList } from "@/services/timeshow/timeshowsSlices"
import {
  useGetDayMovieListQuery,
} from "@/services/daymovie/daymovies.services"
import { loadDayMovieList } from "@/services/daymovie/daymoviesSlices"


const MovieEditPage = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [isFile, setIsFile] = useState('')
  const [previewImage, setPreviewImage] = useState(null);

  const [editMovieMutation, {isLoading}] = useEditMoviesMutation()

  const [uploadImage, ] = useUploadImageMutation()

  const {
    data: movie,
  } = useGetMoviesQuery( id! );

  const FormSchema = z.object({
    name: z.string(),
    description: z.string(),
    status: z.string(),
    time: z.string(),
    director: z.string(),
    actor: z.string(),
    releaseDate: z.string(),
    language: z.string(),
    id_trailer: z.union([z.number(), z.string()]),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: movie?.data.name,
      description: movie?.data.description,
      status: movie?.data.status,
      time: movie?.data.time,
      director: movie?.data.director,
      actor: movie?.data.actor,
      releaseDate: movie?.data.releaseDate,
      language: movie?.data.language,
      id_trailer: movie?.data.trailer.id,
    },
  })

  useEffect(() => {
    if (movie) {
      form.reset({
        name: movie.data.name,
        description: movie.data.description,
        status: movie.data.status,
        time: movie.data.time,
        director: movie.data.director,
        actor: movie.data.actor,
        releaseDate: movie.data.releaseDate,
        language: movie.data.language,
        id_trailer: movie.data.trailer.id,
      })
      setSelectedCategories(categoryIds)
      setSelectedTimes(timeShowIds)
      setSelectedDays(dayMovieIds)
      setPreviewImage(movie.data.image);
    }
  },[movie])

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setPreviewImage(reader.result);
        const formData = new FormData();
        formData.append('image', file);
        const pathFile = await uploadImage(formData);
        setIsFile(pathFile?.data.url);
      };
      reader.readAsDataURL(file);
    }
  };

  const categoryIds = movie?.data?.id_category.map((category: any) => category.id) || []
  const timeShowIds = movie?.data?.time_shows.map((timeshow: any) => timeshow.id) || []
  const dayMovieIds = movie?.data?.day_movies.map((daymovie: any) => daymovie.id) || []


  const handleSelectCategoryChange = (event: any) => {
    const selectedValue = event.target.value
    const selectedCategory = categoryState?.find((category) => category.id == selectedValue)
    if (selectedCategory && !selectedCategories.includes(selectedCategory.id)) {
      setSelectedCategories((prevItems) => [...prevItems, selectedCategory.id])
    }
  };
  const handleRemoveCategory = (selectedItemId: number | undefined | string) => {
    setSelectedCategories((prevItems) => prevItems.filter((itemId) => itemId !== selectedItemId))
  }

  const handleSelectTimeShowChange = (event: any) => {
    const selectedValue = event.target.value
    const selectedTimeShow = timeshowState?.find((timeshow) => timeshow.id == selectedValue)
    if (selectedTimeShow && !selectedTimes.includes(selectedTimeShow.id)) {
      setSelectedTimes((prevItems) => [...prevItems, selectedTimeShow.id])
    }
  };
  const handleRemoveTimeShow = (selectedItemId: number | undefined | string) => {
    setSelectedTimes((prevItems) => prevItems.filter((itemId) => itemId !== selectedItemId))
  }

  const handleSelectDayMovieChange = (event: any) => {
    const selectedValue = event.target.value
    const selectedDayMovie = daymovieState?.find((daymovie) => daymovie.id == selectedValue)
    if (selectedDayMovie && !selectedDays.includes(selectedDayMovie.id)) {
      setSelectedDays((prevItems) => [...prevItems, selectedDayMovie.id])
    }
  };
  const handleRemoveDayMovie = (selectedItemId: number | undefined | string) => {
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



  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formData = {
      id,
      name: data.name,
      description: data.description,
      status: data.status,
      time: data.time,
      director: data.director,
      actor: data.actor,
      releaseDate: data.releaseDate,
      language: data.language,
      image: isFile ? isFile : movie?.data.image,
      id_category: selectedCategories,
      id_trailer: data.id_trailer,
      id_time: selectedTimes,
      id_day_movie: selectedDays,
    }
    //console.log(formData)
    try {
      await editMovieMutation(formData).unwrap().then(() => {
        dispatch(editNewMovie(formData))
      }).then(() => {
        toastSuccess('Cập nhật phim thành công')
      }).then(() => {
        navigate('/admin/movie')
      })
    } catch (error:unknown) {
      toastError('Cập nhật phim thất bại!')
    }
  };

  return (
    <>
      <div  className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl ">
          <h1  className="mb-6 text-xl font-semibold lg:text-2xl">Cập nhật phim</h1>

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
            <FormLabel className="block text-sm font-medium text-gray-900 dark:text-white">Thể loại (Nếu bạn muốn bỏ thể loại đó thì nhấp chuột vào thể loại đó. Ví dụ: bỏ Hành động thì nhấp chuột vào "Hành động")</FormLabel>
                  <div style={{ display: 'flex' }}>
                      {selectedCategories?.map((selectedCategorysId, index) => {
                        const selectedCategory = categoryState?.find(
                          (category) => category.id == selectedCategorysId
                        )
                        return ( 
                          <div 
                            key={index} 
                            style={{ margin: '0 8px', padding: '4px 12px', background: '#ccc', borderRadius: '6px' }}
                            onClick={() => handleRemoveCategory(selectedCategory?.id)}
                          >
                              {selectedCategory?.name}
                          </div>
                        )
                      })}
                    </div>
              <FormControl>
                      <select onChange={handleSelectCategoryChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Chọn thể loại</option>
                        {categoryState?.map((item, index) => (
                          <option key={index} value={item?.id}>
                            {item?.name}
                          </option>
                        ))}
                      </select>
                  </FormControl>
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
                  <FormLabel>Ảnh đại diện</FormLabel>
                    <FormControl>
                      <Input type="file" onChange={handleImageChange} className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
                    </FormControl>
                  {previewImage && <img style={{ width: '200px' }} src={previewImage} alt="Preview" className="mt-2 w-full max-h-96" />}
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
                            {item?.url} - {item?.id_movie?.name}
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
                            {selectedTimeShow?.name} - {'phòng chiếu '+ selectedTimeShow?.id_room}
                        </div>
                      )
                    })}
                  </div>
                  <FormControl>
                      <select onChange={handleSelectTimeShowChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Chọn thời gian chiếu</option>
                        {timeshowState?.map((item, index) => (
                          <option key={index} value={item?.id}>
                            {item?.name} - {'phòng chiếu '+ item?.id_room}
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
                              Ngày {selectedDayMovie?.day} - {selectedDayMovie?.month_rank}
                          </div>
                        )
                      })}
                    </div>
                    <FormControl>
                      <select onChange={handleSelectDayMovieChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Chọn ngày chiếu</option>
                        {daymovieState?.map((item, index) => (
                          <option key={index} value={item?.id}>
                            {item?.day} - {item?.month_rank}
                          </option>
                        ))}
                      </select>
                  </FormControl>
            </div>

            <div>
              <Button type="submit" className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white">Cập nhật</Button>
            </div>
        </form>
        </Form>
      </div>
    </>
  )
}

export default MovieEditPage