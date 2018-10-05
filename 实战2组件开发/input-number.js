function isValueNumber (value){
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '');
}

Vue.component('input-number',{
    // 创建模版 模版必须包含在一个div内
    // input控件 设置value为currentValue 绑定change监听器 函数为handleChange
    // 加减按钮 设置其的disable属性 点击事件
    template:'' +
        '<div class="input-number">' +
        '<input type="text" :value="currentValue" @change="handleChange" @keydown.up="handleUp" @keydown.down="handleDown"/>' +
        '<input type="text" :value="step" @change="handleChangeStep" />' +
        '<button' +
        '@click="handleDown"' +
        ':disable="currentValue <= min">-</button>' +
        '<button' +
        '@click="handleUp"' +
        ':disable="currentValue >= max">+</button>' +
        '</div>',
    // 数据注册 接收从父组件传入的max min value
    props:{
        max:{
            type:Number,
            default:Infinity
        },
        min:{
            type:Number,
            default:-Infinity
        },
        value:{
            type:Number,
            default:0
        }
    },
    // 子组件数据 需要以函数形式返回值
    data: function () {
        return {
            currentValue:this.value,
            step: 5
        }
    },
    // 监听器 监听currentValue value变化 并执行函数
    // currentValue 是监听子组件的值修改
    // value 是监听父组件的值修改
    watch:{
        currentValue: function (val) {
            this.$emit('input',val); // 无用
            this.$emit('on-change',val); // 无用
        },
        value: function (val) {
            this.updataValue(val)
        },
        step: function (val) {
            this.stepChange(val)
        }
    },
    // 组件函数
    methods:{
        stepChange:function(val){
            this.step =  val
        },
        // 修改输入的值为0-10范围内
        updataValue:function (val) {
            if(val > this.max) val = this.max;
            if(val < this.min) val = this.min;
            this.currentValue = val;
        },
        // 减操作
        handleDown:function () {
            if(this.currentValue <= this.min) return;
            this.currentValue -= this.step;
        },
        // 加操作
        handleUp:function () {
            if(this.currentValue >= this.max) return;
            this.currentValue += this.step;
        },
        //
        handleChange:function (e) {
            // event.target 返回触发该事件的节点 此处指的是<input>
            // 获取input的值 并做前后空格清楚处理 .trim()
            var val = e.target.value.trim();

            var max = this.max;
            var min = this.min;

            // 做val是否为数字的判断
            // 是 执行 数字范围设定
            // 否 执行 初始化即 value=5
            if(isValueNumber(val)){
                // 强转为Number类型 方便做判断
                val = Number(val);
                this.currentValue = val;

                if(val > max){
                    this.currentValue = max;
                } else if(val < min){
                    this.currentValue = min;
                }
            }else {
                e.target.value = this.currentValue
            }
        },

        handleChangeStep:function (e) {
            this.step =  Number(e.target.value.trim())
        }
    },
    // 挂载前执行函数
    mounted: function () {
        // 将父组件传入的值 规定在0-10之间
        this.updataValue(this.value);
    }
})