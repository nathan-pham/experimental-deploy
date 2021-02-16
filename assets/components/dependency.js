import { sortableContainer, sortableElement, sortableHandle } from "react-sortable-hoc"

const DragHandle = sortableHandle(() => (
    <i className="fas fa-grip-vertical drag-handle"></i>
))

const SortableItem = sortableElement(({ children, ...props }) => (
    <li {...props}>
        <DragHandle />
        { children }
    </li>
))

const SortableContainer = sortableContainer(({ children }) => (
    <ul className="dependencies">{ children }</ul>
))

export {
    SortableItem,
    SortableContainer
}