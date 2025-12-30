import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

export const useCreateCourse = () => {
  return useMutation({
    mutationKey: ["create-course"],
    mutationFn: async (data: Record<string, string>) => {
      const response = await api.post("/courses");
      console.log("The requested response is given as", response.data.data);
    },
  });
};
export const useGetCourseById = () => {
  return useMutation({
    mutationKey: ["get-course-id"],
    mutationFn: async (id: string) => {
      const response = await api.get(`/course/${id}`);
      console.log("The requested response is given as", response.data.data);
    },
  });
};

export const useDeleteCourse = () =>{
    return useMutation({
        mutationKey:["delete-course"],
        mutationFn: async (id:string) =>{
            const response = await api.delete(`/course`)
            console.log("The requested response is given as",response.data.data)
        }
    })
}