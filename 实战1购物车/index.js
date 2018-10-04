new Vue({
    el:"#app",
    data:{
        list:[
            {
                id:1,
                name:'iphone XS Max',
                price: 13200,
                count:1
            },
            {
                id:2,
                name:'iphone XS',
                price: 10589,
                count:1
            },
            {
                id:3,
                name:'iphone XR',
                price: 8692,
                count:1
            },
        ]
    },
    computed:{
        totalPrice:function () {
            var total = 0
            for ( var i = 0; i<this.list.length; i++ ){
                var item = this.list[i];
                total += item.price * item.count;
            }
            return total.toString().replace(/\B(?=(\d{3})+$)/g,",");
        }
    },
    methods:{
        handleReduce: function (index) {
            if(this.list[index].count === 1) return;
            this.list[index].count--;
        },
        handleAdd:function (index) {
            this.list[index].count++;
        },
        handleRemove:function (index) {
            this.list.splice(index,1);
        }
    }
})