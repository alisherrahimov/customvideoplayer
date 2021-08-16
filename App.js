import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import {
  faCompress,
  faExpand,
  faPause,
  faPlay,
  faStarAndCrescent,
} from '@fortawesome/free-solid-svg-icons';
import Orientation from 'react-native-orientation';
const {width, height} = Dimensions.get('screen');
export default function App() {
  const video_ref = useRef(null);
  const [pause, setPause] = useState(false);
  const [controls, setControls] = useState(true);
  const [ori, setOri] = useState(false);
  const [start, setStartTime] = useState('');
  const [end, setEndTime] = useState('');
  const [duration, setDuration] = useState('');
  const [currentTime, setCurrentTime] = useState(0);

  const _pause = () => {
    setPause(!pause);
  };
  useEffect(() => {
    setTimeout(() => {
      setControls(false);
    }, 10000);
  }, [controls]);
  const ChangeOri = () => {
    StatusBar.setHidden(!ori, 'slide');
    if (!ori) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
    setOri(!ori);
  };
  const secToMin = time => {
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;
    var ret = '';
    if (hrs > 0) {
      ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }
    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;
    setStartTime(ret);
  };
  const EndMin = time => {
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;
    var ret = '';
    if (hrs > 0) {
      ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }
    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;
    setEndTime(ret);
  };
  const ChangeSlider = value => {
    video_ref.current.seek(value);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}>
      <View>
        <View style={{}}>
          <TouchableOpacity
            onPress={() => {
              setControls(!controls);
            }}
            activeOpacity={0.9}
            style={{
              flex: 1,
              position: 'absolute',
              width: '100%',
              height: !ori ? 300 : width,
              zIndex: 1,
            }}>
            {controls && (
              <View style={{flex: 1}}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={_pause}
                    activeOpacity={0.6}
                    style={{
                      width: 80,
                      height: 80,
                      opacity: 1,
                      backgroundColor: '#000',
                      borderRadius: 100,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <FontAwesomeIcon
                      icon={pause ? faPause : faPlay}
                      size={35}
                      color="#fcba03"
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    marginRight: 15,
                  }}>
                  <TouchableOpacity onPress={ChangeOri}>
                    <FontAwesomeIcon
                      icon={ori ? faCompress : faExpand}
                      size={25}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 0.1}}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      marginHorizontal: 15,
                    }}>
                    <View>
                      <Text style={{color: '#fff'}}>
                        {start} / {end}
                      </Text>
                    </View>
                  </View>
                  <Slider
                    value={currentTime}
                    thumbTintColor="#fcba03"
                    style={{width: width}}
                    minimumValue={0}
                    maximumValue={duration.length == 0 ? 1000 : duration}
                    onValueChange={ChangeSlider}
                    minimumTrackTintColor="#fcba03"
                    maximumTrackTintColor="#ffffff"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: '100%',
            flex: 1,
          }}>
          <Video
            onLoad={data => {
              setDuration(data.duration);
            }}
            onProgress={progress => {
              secToMin(progress.currentTime);
              EndMin(progress.seekableDuration);
              setDuration(progress.seekableDuration);
              setCurrentTime(progress.currentTime);
            }}
            // onSeek={data => {}}
            paused={pause}
            ref={video_ref}
            repeat
            resizeMode="cover"
            source={{
              uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            }}
            style={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: '100%',
              height: !ori ? 300 : width,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
