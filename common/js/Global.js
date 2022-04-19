var isSubmit = false;
function getUUID () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
    })
}
export default {
	isSubmit, //是否处于输入状态
	getUUID //获取uuid
}
