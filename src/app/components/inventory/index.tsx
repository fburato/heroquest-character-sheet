import InventoryComponent from './component'
import { reducer, increaseItemQuantity, decreaseItemQuantity, moveItemUp, deleteItem, moveItemDown, newItemValueChange, addNewItem, changeItemQuantity } from './reducer'
const actions = { increaseItemQuantity, decreaseItemQuantity, moveItemUp, deleteItem, moveItemDown, newItemValueChange, addNewItem, changeItemQuantity }
export { reducer, actions }
export default InventoryComponent
