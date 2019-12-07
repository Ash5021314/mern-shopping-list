import React, {useState, useEffect} from 'react'
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import {getItems, deleteItem} from '../action/itemAction'
import PropTypes from 'prop-types'

const ShoppingList = (props) => {
  const {getItems, deleteItem, data} = props
  const [items, setItems] = useState({})
  useEffect(() => {
    getItems()
  }, [])

  useEffect(() => {
    setItems(data)
  }, [data.length])

  const onDeleteClick = id => {
    deleteItem(id)
  }

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className='shopping-list'>
          {data.items.map(({_id, name}) => (
            <CSSTransition key={_id} timeout={500}>
              <ListGroupItem>
                <Button
                  className="remove-btn" color={'danger'} size={'sm'}
                  onClick={onDeleteClick.bind(this, _id)}
                >&times;</Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  )
}
ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  data: state.item
})

export default connect(mapStateToProps, {getItems, deleteItem})(ShoppingList)