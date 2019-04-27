import _curry from 'lodash/curry'
import { bindActionCreators as reduxBindActionCreators } from 'redux'

export const bindActionCreators = _curry(reduxBindActionCreators)
