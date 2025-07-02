
import { deleteEmployeeIdAtom } from "../../state/common";
// import { EditEmployeeIdAtom } from "../../state/common";
// import { queryParamsAtom } from "@/features/restaurants-listing/state/filter";
import { API_CACHE_KEY } from "@/shared/components/constants/api-cache-key";
import { useMutation } from "@/shared/hook/api/core/use-mutation";
import { employeeApi } from "../../api/empoloyee-listing-api";
import { defaultStore } from "@/shared/libs/jotai/default-store";
export const useMutationDelete=()=>{
    // const queryParams=useAtomValue(queryParamsAtom)

    return useMutation(
        API_CACHE_KEY.EMPLOYEE_DELETE,
        employeeApi.deleteEmployee,
        {
            onSuccess:()=>{
                 defaultStore.set(deleteEmployeeIdAtom, null);

            }
        }
    )
}