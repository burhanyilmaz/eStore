import { height, width } from '@utils/helpers';
import { X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

type Props = {
  onClose: () => void;
  productImage?: string;
  visiblePreview: boolean;
};
const ProductImagePreview = ({ visiblePreview, productImage, onClose }: Props) => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const [imageLoaded, setImageLoaded] = useState(false);

  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onLoadImage = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    if (!visiblePreview) {
      scale.value = 1;
      savedScale.value = 1;
      setImageLoaded(false);
    }
  }, [visiblePreview]);

  return (
    <Modal visible={visiblePreview} transparent>
      <Pressable onPress={onClose} style={styles.close}>
        <X color="white" />
      </Pressable>
      <View style={styles.container}>
        {!imageLoaded && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={'white'} />
          </View>
        )}
        <GestureHandlerRootView>
          <GestureDetector gesture={pinchGesture}>
            <Animated.Image
              onLoad={onLoadImage}
              resizeMode="contain"
              source={{ uri: productImage }}
              style={[styles.image, animatedStyle]}
            />
          </GestureDetector>
        </GestureHandlerRootView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  close: {
    top: 32,
    right: 16,
    zIndex: 20,
    padding: 16,
    marginTop: 24,
    borderRadius: 100,
    position: 'absolute',
    backgroundColor: 'black',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  image: {
    width: width,
    height: height / 2,
  },
});

export default ProductImagePreview;
