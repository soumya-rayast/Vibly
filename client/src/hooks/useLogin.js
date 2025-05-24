import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";

const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Optionally store token here if returned
      // localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err) => {
      console.error("❌ Login failed:", err);
    },
  });

  return { error, isPending, loginMutation: mutate, data };
};

export default useLogin;
