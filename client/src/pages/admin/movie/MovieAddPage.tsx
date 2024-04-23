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
import { useAddMoviesMutation, useUploadImageMutation } from "@/services/movies/movies.services"
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


interface trailer {
  id: number,
  url: string,
  id_movie: {
    name: string
  }
}

const MovieAddPage = () => {

  // const [selectedCategories, setSelectedCategories] = useState([]);
  // const [selectedDays, setSelectedDays] = useState([]);
  // const [selectedTimes, setSelectedTimes] = useState([]);

  // const [isFile, setIsFile] = useState('')
  // const [previewImage, setPreviewImage] = useState(null);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<number[]>([]);

  const [isFile, setIsFile] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);


  const [uploadImage, ] = useUploadImageMutation()

  // const handleImageChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = async () => {
  //       setPreviewImage(reader.result);
  //       const formData = new FormData();
  //       formData.append('image', file);
  //       try {
  //         const pathFile = await uploadImage(formData);
  //         setIsFile(pathFile?.data.url);
  //       } catch (error) {
  //         console.error('Error uploading image:', error);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setPreviewImage(reader.result as string);
        const formData = new FormData();
        formData.append('image', file);
        try {
          const pathFile = await uploadImage(formData);
          setIsFile(pathFile?.data?.url);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [addMovieMutation] = useAddMoviesMutation()

  const handleSelectCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedCategory = categoryState?.find((category) => category.id == selectedValue);
    if (selectedCategory && !selectedCategories?.includes(Number(selectedCategory?.id))) {
      setSelectedCategories((prevItems) => [...prevItems, Number(selectedCategory?.id)]);
    }
  };
  const handleRemoveCategory = (selectedItemId: number | undefined | string) => {
    setSelectedCategories((prevItems) => prevItems.filter((itemId) => itemId !== selectedItemId))
  }

  const handleSelectTimeShowChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value
    const selectedTimeShow = timeshowState?.find((timeshow) => timeshow.id == selectedValue)
    if (selectedTimeShow && !selectedTimes.includes(Number(selectedTimeShow.id))) {
      setSelectedTimes((prevItems) => [...prevItems, Number(selectedTimeShow.id)])
    }
  };
  const handleRemoveTimeShow = (selectedItemId : number | undefined | string) => {
    setSelectedTimes((prevItems) => prevItems.filter((itemId) => itemId !== selectedItemId))
  }

  const handleSelectDayMovieChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value
    const selectedDayMovie = daymovieState?.find((daymovie) => daymovie.id == selectedValue)
    if (selectedDayMovie && !selectedDays.includes(Number(selectedDayMovie.id))) {
      setSelectedDays((prevItems) => [...prevItems, Number(selectedDayMovie.id)])
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
  }, [dispatch, category, isCategoryListSuccess])

  // const trailerState = useAppSelector(
  //   (state) => state.trailers.trailers
  // );
  const {
    data: trailer,
    isSuccess: isTrailerListSuccess,
  } = useGetTrailerListQuery([]);
  useEffect(() => {
    dispatch(loadTrailerList(trailer?.data));
  }, [dispatch, trailer, isTrailerListSuccess])

  const timeshowState = useAppSelector(
    (state) => state.timeshows.timeshows
  );
  const {
    data: timeshow,
    isSuccess: isTimeShowListSuccess,
  } = useGetTimeShowListQuery([]);
  useEffect(() => {
    dispatch(loadTimeShowList(timeshow?.data));
  }, [dispatch, timeshow, isTimeShowListSuccess])

  const daymovieState = useAppSelector(
    (state) => state.daymovies.daymovies
  );
  const {
    data: daymovie,
    isSuccess: isDayMovieListSuccess,
  } = useGetDayMovieListQuery([]);
  useEffect(() => {
    dispatch(loadDayMovieList(daymovie?.data));
  }, [dispatch, daymovie, isDayMovieListSuccess])


  const FormSchema = z.object({
    name: z.string().nonempty("Tên phim không được để trống!"),
    description: z.string().nonempty("Mô tả không được để trống!"),
    status: z.string().nonempty("Trạng thái không được để trống!"),
    time: z.string().nonempty("Thời lượng phim không được để trống!"),
    director: z.string().nonempty("Giám đốc bộ phim không được để trống!"),
    actor: z.string().nonempty("Diễn viên không được để trống!"),
    releaseDate: z.string().nonempty("Ngày bộ phim ra mắt không được để trống!"),
    language: z.string().nonempty("Ngôn ngữ không được để trống!"),
    id_trailer: z.string().nonempty("Trailer không được để trống!"),
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
      image: isFile,
      id_category: selectedCategories,
      id_trailer: data.id_trailer,
      id_time: selectedTimes,
      id_day_movie: selectedDays,
    }
    console.log(formData)
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
                        {trailer?.data?.map((item: trailer, index: number) => (
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
              <Button type="submit" className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white">Xác Nhận Thêm</Button>
            </div>
        </form>
        </Form>
      </div>
    </>
  )
}

export default MovieAddPage