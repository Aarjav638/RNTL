import {
  act,
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor,
} from '@testing-library/react-native';
import Testing from './Testing';

const mockFuntion = jest.fn();

// mocking modules

jest.mock('react-native/Libraries/Alert/Alert', () => {
  return {
    alert: jest.fn(),
  };
});

describe('App Component', () => {
  test('renders correctly', async () => {
    jest.useFakeTimers();
    //setup the user event

    const user = userEvent.setup({
      advanceTimers: () => jest.advanceTimersByTime(10000),
    });

    render(<Testing age={20} />);

    let ageElement = screen.getByTestId('age');
    expect(ageElement).toHaveTextContent('Age: 20');
    // force update the component not working
    // screen.update(<App age={60} key={'new-key'}/>);
    // screen.debug();
    // await waitFor(() => {
    //   ageElement = screen.getByTestId('age');
    //   expect(ageElement).toHaveTextContent('Age: 60');
    // });
    screen.update(<Testing age={60} onPress={mockFuntion} />);
    expect(ageElement).toHaveTextContent('Age: 60');
    expect(screen.getByText('App')).toBeTruthy();
    expect(screen.getByLabelText('CheckText')).toBeTruthy();
    expect(screen.getByText('App')).toBeOnTheScreen();
    expect(screen.getByLabelText('CheckText')).toBeOnTheScreen();

    const testElement = screen.queryByText('Test');
    expect(testElement).toBeTruthy();

    // Uncomment the below code to see the result when element is not found

    // below code will throw error as element is not found and it will wait for 2 seconds

    // const findElement = await screen.findByText('Find', {
    //   exact: true,
    // }, {
    //   timeout: 2000,
    //   interval: 100,
    //   onTimeout:(error)=>{
    //     screen.debug({
    //       message: 'Element not found',
    //       mapProps: (props) => {
    //         return {
    //           ...props,
    //           children: 'Element not found',
    //         };
    //       }
    //     });
    //     return error;
    //   }

    // });

    const findElement = await screen.findByText(
      'Find By',
      {
        exact: true,
      },
      {
        timeout: 2000,
        interval: 100,
        onTimeout: error => {
          screen.debug({
            message: 'Element not found',
            mapProps: props => {
              return {
                ...props,
                children: 'Element not found',
              };
            },
          });
          return error;
        },
      },
    );
    expect(findElement).toBeTruthy();

    await waitFor(
      () => {
        expect(screen.getByTestId('Count')).toHaveTextContent('28');
      },
      {
        timeout: 3000,
        interval: 1000,
        onTimeout: error => {
          console.error('Timeout Error: Element not updating');
          screen.debug();
          throw error;
        },
      },
    );

    expect(screen.getByTestId('Count')).toBeOnTheScreen();

    //user Event
    const button = screen.getByTestId('button');

    await user.press(button);

    const textConditional = screen.queryByTestId('visibility');

    expect(textConditional).toHaveTextContent('Visible');

    //FIRE EVENT API

    // fireEvent.press(button);
    // act(() => {
    //   jest.advanceTimersByTime(10000);
    // });

    // const textConditional1 = screen.queryByTestId('visibility');

    // expect(textConditional1).toHaveTextContent('Visible');

    //mock function

    const button1 = screen.getByTestId('button1');

    await user.press(button1);

    expect(mockFuntion).toHaveBeenCalled();
  });
});
