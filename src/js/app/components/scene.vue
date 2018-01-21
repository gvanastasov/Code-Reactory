<template>
    <div>
        <slot>Scene</slot>
    </div>
</template>

<script>

export default {
    name: 'scene',

    components: {
    },

    mounted: function(){
        console.log('scene mounted');
    }
}
</script>