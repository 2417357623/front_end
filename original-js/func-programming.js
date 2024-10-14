    //Higher-Order 
    //higher-order function is a function that either take a function as a argument or returns a function as a result

//Function : enhancing function 
//we can reuse the enhancement logic across multiple functions,we can return a array to do more jobs

const eat = ()=>{
    console.log("eat")
}

const run = ()=>{
    console.log("run")
}

const count = (func)=>{
    let count = 0;
    return [
        (...args) =>{
            func(args)
            count++
        },
        () =>{
            console.log(count)
        }
    ]
}

const [countEat,getCount] = count(eat)
countEat()
countEat()
countEat()
countEat()
getCount()

//Function : framework function 
//facilitate common tasks and abstract away complexity. those functions allow developer to focus on high-level logic without worrying about the underlying implementation
//for example : we use reduce to implement a map

const myMap = (arr, callback) => {
    return arr.reduce((pre, cur) => {
        pre.push(callback(cur));  // Push the result from callback
        return pre;  // Return the accumulator
    }, []);
};

let a = [1, 2, 3];

const b = myMap(a, (item) => item * item);  // Return value directly
console.log(b);  // [1, 4, 9]


//functions composition

const pipe = (...func)=>{
    return input => {
        func.reduce((pre,cur)=>{
            return cur(pre)
        },input)
    }
}

//currying 

const curry = (func,arg)=>{
    if(!arg){
        arg = []
    }
    return (input) =>{
        arg.push(input)

        if(arg.length >= func.length){
            return func(...arg)
        }else{
            return curry(func,arg)
        }
    }
}

