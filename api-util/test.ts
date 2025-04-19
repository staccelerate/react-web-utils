import ApiUtil from "./mod.js";
import { GET } from "./helpers/wrappers.js";

const apiUtil = new ApiUtil("https://reqres.in");

class MyApi {
    @GET(apiUtil, "/api/users/2")
    test() {
        console.log("DONE");
    }
}

new MyApi().test();

