export const test = ()=>{
    console.log('test');
}


export function printMe() {
    const b = [1,2,3];
    const a = [...b];
    console.log('I get called from print.js!'+ `${a}`);
}