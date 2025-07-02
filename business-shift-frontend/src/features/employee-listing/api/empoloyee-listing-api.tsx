import { fetchClient } from "@/shared/libs/openapi-typescript-fetch/fetch-client";
export const employeeApi = {
    getEmployee: fetchClient.path("/api/employee/getEmployee").method("post").create(),
       deleteEmployee: fetchClient.path("/api/employee/delete/{id}").method("delete").create(),
    updateEmployee: fetchClient.path("/api/employee/update/{id}").method("patch").create(),
};