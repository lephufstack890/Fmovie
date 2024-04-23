// import { DeleteIcon, EditIcon } from "lucide-react";
// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from "@/app/hooks";
// import {
//     useDeleteMoviesMutation,
//     useGetMoviesListQuery,
// } from "@/services/movies/movies.services";
// import { deleteMovie, loadMovieList } from "@/services/movies/moviesSlices";
// import { toastError, toastSuccess } from "@/hook/Toast";
// import { Link } from "react-router-dom";

// const MovieListPage = () => {

//     const dispatch = useAppDispatch();
//     const movieState = useAppSelector(
//         (state) => state.movies.movies
//     );
//     const {
//         data: movie,
//         isSuccess: isMovieListSuccess,
//     } = useGetMoviesListQuery([]);

//     const [deleteMovieApi] = useDeleteMoviesMutation();

//     useEffect(() => {
//         dispatch(loadMovieList(movie?.data));
//     }, [isMovieListSuccess]);


//     const tHead = ["STT", "Tên phim", "Thể loại", "Thời gian", "Trạng thái", "Tác vụ", ""];

//     const getCategoryNames = (categories: { name: string }[]) => {
      
//       if(categories && categories.length > 0){
//         const categoryNames: string[] = [];
        
//         categories.forEach(function(category) {
//           categoryNames.push(category?.name);
//         });
//         const output = categoryNames.join(', ');
  
//         return output;
//       }
//     }

//     const handleDeleteMovie = async (id: string | number) => {
//         try {
//           await deleteMovieApi(id).unwrap().then(() => {
//             dispatch(deleteMovie(id))
//           }).then(() => {
//             toastSuccess('Xóa phim thành công')
//           })
//         } catch (error) {
//           toastError('Xóa phim thất bại')
//         }
//       };
//     return (
//         <div>
//             <div className="mx-auto mt-1">
//                 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                     <div className="sm:flex sm:items-center">
//                         <div className="sm:flex-auto">
//                             <h1 className="text-2xl font-semibold leading-6 text-gray-900">
//                                 Danh sách phim
//                             </h1>
//                         </div>
//                         <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
//                             <button
//                                 type="button"
//                                 className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                             >
//                                 <Link
//                                     to="/admin/movie/add"
//                                     style={{
//                                         textDecoration: "none",
//                                         color: "inherit",
//                                     }}
//                                 >
//                                     Thêm phim
//                                 </Link>
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mt-8 flow-root overflow-hidden">
//                 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                     <table className="w-full text-left ">
//                         <thead className="bg-white">
//                             <tr className="border-t border-b">
//                                 {tHead.map((item, index) => (
//                                     <th
//                                         key={index}
//                                         scope="col"
//                                         className=" py-3 px-3 text-left text-base font-semibold text-gray-900"
//                                     >
//                                         {item}
//                                     </th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {movieState?.map((item, index) => (
//                                 <tr key={index} className="border-b">
//                                     <td className="py-2 px-3 text-base font-medium text-gray-900">
//                                         {index + 1}
//                                     </td>
//                                     <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
//                                         {item?.name}
//                                     </td>
//                                     <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
//                                         {getCategoryNames(item?.id_category)}
//                                     </td>
//                                     <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
//                                         {item?.time} phút
//                                     </td>
//                                     <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
//                                         {item?.status}
//                                     </td>
//                                     <td className="relative py-2 pl-3 text-right text-base font-medium flex">
//                                         <Link
//                                             to={`/admin/movie/edit/${item?.id}`}
//                                             className="text-indigo-600 hover:text-indigo-900  p-2 mr-5 cursor-pointer"
//                                         >
//                                             <EditIcon />
//                                         </Link>
//                                         <div
//                                             onClick={() =>
//                                                 handleDeleteMovie(item.id!)
//                                             }
//                                             className="p-2 text-red-400 cursor-pointer"
//                                         >
//                                             <DeleteIcon />
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//             </div>
//         </div>
//     );
// };

// export default MovieListPage;





import { DeleteIcon, EditIcon } from "lucide-react";
import { useEffect } from 'react';
import { useAppDispatch} from "@/app/hooks";
import {
    useDeleteMoviesMutation,
    useGetMoviesListQuery,
} from "@/services/movies/movies.services";
import { deleteMovie, loadMovieList } from "@/services/movies/moviesSlices";
import { toastError, toastSuccess } from "@/hook/Toast";
import { Link } from "react-router-dom";

interface Category {
    name: string;
}

interface Movie {
    id: number,
    name: string,
    id_category: Category[],
    time: number,
    status: string
}

const MovieListPage = () => {

    const dispatch = useAppDispatch();
    // const movieState = useAppSelector(
    //     (state: { movies: { movies: Movie } }) => state.movies.movies
    // );
    const {
        data: movie,
        isSuccess: isMovieListSuccess,
    } = useGetMoviesListQuery([]);

    const [deleteMovieApi] = useDeleteMoviesMutation();

    useEffect(() => {
        dispatch(loadMovieList(movie?.data));
    }, [isMovieListSuccess]);


    const tHead = ["STT", "Tên phim", "Thể loại", "Thời gian", "Trạng thái", "Tác vụ", ""];

    const getCategoryNames = (categories: Category[]): string => {
      
      if(categories && categories.length > 0){
        const categoryNames: string[] = [];
        
        categories.forEach((category) => {
          categoryNames.push(category?.name);
        });
        const output = categoryNames.join(', ');
  
        return output;
      }
      return '';
    }

    const handleDeleteMovie = async (id: string | number) => {
        try {
          await deleteMovieApi(id).unwrap().then(() => {
            dispatch(deleteMovie(id))
          }).then(() => {
            toastSuccess('Xóa phim thành công')
          })
        } catch (error) {
          toastError('Xóa phim thất bại')
        }
      };
    return (
        <div>
            <div className="mx-auto mt-1">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-2xl font-semibold leading-6 text-gray-900">
                                Danh sách phim
                            </h1>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <button
                                type="button"
                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <Link
                                    to="/admin/movie/add"
                                    style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                    }}
                                >
                                    Thêm phim
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flow-root overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <table className="w-full text-left ">
                        <thead className="bg-white">
                            <tr className="border-t border-b">
                                {tHead.map((item, index) => (
                                    <th
                                        key={index}
                                        scope="col"
                                        className=" py-3 px-3 text-left text-base font-semibold text-gray-900"
                                    >
                                        {item}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* {movieState?.map((item, index) => ( */}
                            {movie?.data?.map((item: Movie, index: number) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2 px-3 text-base font-medium text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                        {item?.name}
                                    </td>
                                    <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                        {getCategoryNames(item?.id_category)}
                                    </td>
                                    <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                        {item?.time} phút
                                    </td>
                                    <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                        {item?.status}
                                    </td>
                                    <td className="relative py-2 pl-3 text-right text-base font-medium flex">
                                        <Link
                                            to={`/admin/movie/edit/${item?.id}`}
                                            className="text-indigo-600 hover:text-indigo-900  p-2 mr-5 cursor-pointer"
                                        >
                                            <EditIcon />
                                        </Link>
                                        <div
                                            onClick={() =>
                                                handleDeleteMovie(item.id!)
                                            }
                                            className="p-2 text-red-400 cursor-pointer"
                                        >
                                            <DeleteIcon />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>
    );
};

export default MovieListPage;


