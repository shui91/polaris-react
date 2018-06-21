import * as React from 'react';
import * as PropTypes from 'prop-types';
import {mountWithAppProvider} from '../../../../tests/utilities';
import {createPolarisContext} from '../../AppProvider/utils';

import {noop} from '../../../utilities/other';

import Toast from '../Toast';

describe('<Toast />', () => {
  it('shows the toast with a unique ID on mount', () => {
    const props = {children: 'Hello world!', onDismiss: noop};
    const composedProps = {
      ...props,
      ...createPolarisContext(),
    };
    const {frame} = mountWithContext(<Toast {...props} />);
    expect(frame.showToast).toHaveBeenCalledWith({
      id: expect.any(String),
      ...composedProps,
    });
  });

  it('hides the toast based on ID on unmount', () => {
    const {toast, frame} = mountWithContext(<Toast onDismiss={noop} />);
    expect(frame.hideToast).not.toHaveBeenCalled();
    toast.unmount();

    const {id} = frame.showToast.mock.calls[0][0];
    expect(frame.hideToast).toHaveBeenCalledWith({id});
  });
});

function mountWithContext(element: React.ReactElement<any>) {
  const frame = {showToast: jest.fn(), hideToast: jest.fn()};
  const toast = mountWithAppProvider(element, {
    context: {frame},
    childContextTypes: {frame: PropTypes.any},
  });

  return {toast, frame};
}
