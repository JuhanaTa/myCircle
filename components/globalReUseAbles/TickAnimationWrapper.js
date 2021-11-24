import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useSelector } from 'react-redux';

class TickAnimation extends React.Component {
  componentDidMount() {
    this.animation.play(20, 120);
  }

  render() {
    return (
      <View style={styles.animationContainer}>
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={{
            width: 250,
            height: 250
            //backgroundColor: '#eee',
          }}
          duration={3}
          source={require('../../assets/tick-pop.json')}
          //more Lottie files @ https://lottiefiles.com/featured
        />
      </View>
    );
  }
}

// the class compenent is wrapped with a functional component
// to enable Hook API implementations
const TickAnimationWrapper = () => {
  const { isTickAnimationOpened } = useSelector((state) => state.toggles);

  if (!isTickAnimationOpened) return null;
  console.log('tick', isTickAnimationOpened);

  return <TickAnimation />;
};
export default TickAnimationWrapper;

const styles = StyleSheet.create({
  animationContainer: {
    position: 'absolute',
    zIndex: 10,
    top: '50%',
    left: '18%',
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: -10
    

  }
});
