

import { bindActionCreators as reduxBindActionCreators } from 'redux'
import _curry from 'lodash/curry'

export const bindActionCreators = _curry(reduxBindActionCreators)