import {add, compareAsc, format} from "date-fns";
const date = new Date(2014,8,1,23,59,59);
const result = add(date, {
    years: 2
})

console.log(format(result, 'yyyy-MM-dd HH:mm:ss'))