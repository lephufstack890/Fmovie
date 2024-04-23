import { zodResolver } from "@hookform/resolvers/zod"
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
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { toastError, toastSuccess } from "@/hook/Toast"
import { editNewTrailer } from "@/services/trailer/trailersSlices"
import { useEditTrailerMutation, useGetTrailerQuery } from "@/services/trailer/trailers.services"
import {
  useGetMoviesListQuery,
} from "@/services/movies/movies.services"
import { loadMovieList } from "@/services/movies/moviesSlices"


const TrailerEditPage = () => {

  const { id } = useParams();
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [editTrailerMutation] = useEditTrailerMutation()

  const {
    data: trailer,
  } = useGetTrailerQuery( id! );

  console.log(trailer)

  const movieState = useAppSelector(
    (state) => state.movies.movies
  );

  const {
    data: movie,
    isSuccess: isMovieListSuccess,
  } = useGetMoviesListQuery([]);

  useEffect(() => {
    dispatch(loadMovieList(movie?.data));
  }, [dispatch, movie, isMovieListSuccess])

  const FormSchema = z.object({
    id_movie: z.union([z.number(), z.string()]),
    url: z.string(),
    dateShow: z.string(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id_movie: trailer?.data.id_movie.id,
      url: trailer?.data.url,
      dateShow: trailer?.data.dateShow,
    },
  })

  useEffect(() => {
    if (trailer) {
      form.reset({
        id_movie: trailer.data.id_movie.id,
        url: trailer.data.url,
        dateShow: trailer.data.dateShow,
      })
    }
  },[form, trailer])

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formData = {
      id,
      id_movie: data.id_movie,
      url: data.url,
      dateShow: data.dateShow,
    }
    try {
      await editTrailerMutation(formData).unwrap().then(() => {
        dispatch(editNewTrailer(formData))
      }).then(() => {
        toastSuccess('Cập nhật trailer thành công')
      }).then(() => {
        navigate('/admin/trailer')
      })
    } catch (error:unknown) {
      toastError('Cập nhật trailer thất bại!')
    }
  };

  return (
    <>
      <div  className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl ">
          <h1  className="mb-6 text-xl font-semibold lg:text-2xl">Cập nhật Trailer</h1>
          <div className="grid gap-3 lg:grid-cols-1">
              <FormField
                control={form.control}
                name="id_movie"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên phim</FormLabel>
                    <FormControl>
                      <select {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Chọn phim</option>
                        {movieState?.map((item, index) => (
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
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link Trailer</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.youtube.com/embed/7LH-TIcPqks?si=1uNBIaydQH56cXlm" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div  className="grid gap-3 md:grid-cols-1">
              <FormField
                control={form.control}
                name="dateShow"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày khởi chiếu</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

export default TrailerEditPage