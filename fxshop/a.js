var m={
    age:11
};

function a () {
    console.log(this.age);
}
// a();
a.call(m);
a.bind(m);
a();
// call apply  bind



