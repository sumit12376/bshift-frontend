import { EditEmployeeIdAtom } from "../../state/common";
import { API_CACHE_KEY } from "@/shared/components/constants/api-cache-key";
import { useMutation } from "@/shared/hook/api/core/use-mutation";
import { employeeApi } from "../../api/empoloyee-listing-api";
import { defaultStore } from "@/shared/libs/jotai/default-store";
export const useMutationEdit = () => {
  return useMutation(
    API_CACHE_KEY.EMPLOYEE_UPDATE,
    employeeApi.updateEmployee,
    {
      onSuccess: () => {
        defaultStore.set(EditEmployeeIdAtom, null);
      },
    }
  );
};
