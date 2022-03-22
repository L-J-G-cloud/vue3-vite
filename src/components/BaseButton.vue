<template>
    <div>
        <button class="btn" @click="btnClick(type)">
            <slot></slot>
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    btnWidth:{
        type:String,
        default:'80px'
    },
    btnHeight:{
        type:String,
        default:'30px'
    },
    btnBGC:{
        type:String,
        default:'#C53838'
    },
    btnBR:{
        type:String,
        default:'15px'
    },
    btnColor:{
        type:String,
        default:'#fff'
    },
    btnSize:{
        type:String,
        default:'12px'
    },
    btnAlign:{
        type:String,
        default:'center'
    },
    btnPadding:{
        type:String,
    },
    btnBC :{
        type:String,
        default:'none'
    }
})

const emit = defineEmits(['btnClick'])

const btnClick = () => {
    emit('btnClick')
}
</script>

<style lang='scss' scoped>
    .btn {
        width:  v-bind(btnWidth);
        height: v-bind(btnHeight);
        font-size: v-bind(btnSize);
        color:  v-bind(btnColor);
        background-color: v-bind(btnBGC);
        border: v-bind(btnBC);
        border-radius: v-bind(btnBR);
        text-align: v-bind(btnAlign);
        padding: v-bind(btnPadding);
        // box-shadow: 0 2px v-bind(btnBGC);
        &:active {
            // box-shadow: 0 2px v-bind(btnBGC);
            transform: translateY(1.5px);
        }
    }
</style>