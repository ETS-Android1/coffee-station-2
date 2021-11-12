import React, {useState} from 'react';
import {View, Text, Button, Platform, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

Date.prototype.format = function (f) {
  if (!this.valueOf()) return ' ';

  var weekName = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  var d = this;

  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
    switch ($1) {
      case 'yyyy':
        return d.getFullYear();
      case 'yy':
        return (d.getFullYear() % 1000).zf(2);
      case 'MM':
        return (d.getMonth() + 1).zf(2);
      case 'dd':
        return d.getDate().zf(2);
      case 'E':
        return weekName[d.getDay()];
      case 'HH':
        return d.getHours().zf(2);
      case 'hh':
        return ((h = d.getHours() % 12) ? h : 12).zf(2);
      case 'mm':
        return d.getMinutes().zf(2);
      case 'ss':
        return d.getSeconds().zf(2);
      case 'a/p':
        return d.getHours() < 12 ? '오전' : '오후';
      default:
        return $1;
    }
  });
};

String.prototype.string = function (len) {
  var s = '',
    i = 0;
  while (i++ < len) {
    s += this;
  }
  return s;
};
String.prototype.zf = function (len) {
  return '0'.string(len - this.length) + this;
};
Number.prototype.zf = function (len) {
  return this.toString().zf(len);
};

const MainContainer = styled.View`
  flex-direction: row;
`;
const Container = styled(MainContainer)`
  flex: 1;
  flex-direction: column;
`;
const TimeContainer = styled(MainContainer)`
  align-items: center;
  justify-content: flex-start;
`;
const StyledInput = styled.TextInput`
  border: 1px solid #111111;
  padding: 10px;
  margin: 10px 10px;
  width: 500px;
  height: 50px;
  font-size: 18px;
`;
const StyledText = styled.Text`
  font-size: 18px;
  padding: 10px;
  margin: 10px 0;
`;
const StyledBtn = styled.Button`
  font-size: 18px;
  margin: 10px 0;
`;

const RegiStore = ({route, navigation}) => {
  // Get the params (전 페이지에서 넘겨받은 데이터)
  const {b_no, shopName, generalAddress} = route.params;

  //DateTimePicker from
  const [fromDate, setFromDate] = useState(new Date(1598051730000));
  const [fromShow, setFromShow] = useState(false);
  // 요청에 쓰일 from
  const [from, setFrom] = useState('');

  const onFromChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setFromShow(Platform.OS === 'ios');
    setFromDate(currentDate);
    setFrom(currentDate.format('a/p hh시 mm분'));
  };

  const fromShowTimepicker = () => {
    setFromShow(true);
  };
  // DateTimePicker to
  const [toDate, setToDate] = useState(new Date(1598051730000));
  const [toShow, setToShow] = useState(false);
  // 요청에 쓰일 to
  const [to, setTo] = useState('');

  const onToChange = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setToShow(Platform.OS === 'ios');
    setToDate(currentDate);
    setTo(currentDate.format('a/p hh시 mm분'));
  };

  const toShowTimepicker = () => {
    setToShow(true);
  };
  // Picker
  const [selectedState, setSelectedState] = useState();

  return (
    <MainContainer>
      <Container>
        <StyledText>로고 사진등록</StyledText>
        <StyledText>이미지 인풋자리</StyledText>
        <StyledText>가게명</StyledText>
        <StyledInput></StyledInput>
        <StyledText>가게소개</StyledText>
        <StyledInput style={{height: 150}}></StyledInput>
        <StyledText>Instagram</StyledText>
        <StyledInput></StyledInput>
      </Container>
      <Container>
        <StyledText>가게 전화번호</StyledText>
        <StyledInput></StyledInput>
        {/* 운영시간 */}
        <StyledText>운영시간</StyledText>
        <TimeContainer>
          <TouchableOpacity onPress={fromShowTimepicker}>
            <StyledInput
              placeholder="from"
              value={from}
              editable={false}
              style={{width: 200}}
            />
            {fromShow && (
              <DateTimePicker
                testID="dateTimePicker"
                value={fromDate}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onFromChange}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={toShowTimepicker}>
            <StyledInput
              value={to}
              onChange={setTo}
              placeholder="to"
              editable={false}
              style={{width: 200}}
            />
            {toShow && (
              <DateTimePicker
                testID="dateTimePicker"
                value={toDate}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onToChange}
              />
            )}
          </TouchableOpacity>
        </TimeContainer>
        <StyledText>운영 상태</StyledText>
        <Picker
          mode={'dropdown'}
          selectedValue={selectedState}
          onValueChange={(itemValue, itemIndex) => setSelectedState(itemValue)}>
          <Picker.Item label="OPEN" value="OPEN" />
          <Picker.Item label="CLOSE" value="CLOSE" />
          <Picker.Item label="READY" value="READY" />
        </Picker>
      </Container>
    </MainContainer>
  );
};

export default RegiStore;