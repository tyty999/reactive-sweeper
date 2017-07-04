import React, {PureComponent} from 'react';
import {View, FlatList} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';

import {styles} from './styles';
import {tileBasis, fieldTiles} from './constants';
import {sprites, getSpriteNameForTile} from './sprites';

export default class Field extends PureComponent {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  static getRowKey(item, index) {
    return index;
  }

  static getRowLayout(data, index) {
    return {
      index,
      length: tileBasis,
      offset: tileBasis * index
    };
  }

  renderRow({item, index: row}) {
    const {onTapTile} = this.props;
    return (
      <View key={row} style={styles.tileRow}>
        {item.map((tile, column) => (
          <View key={column} style={styles.tile}>
            <TouchableScale activeScale={0.7}
                            onPress={() => onTapTile(row, column, false)}
                            onLongPress={() => onTapTile(row, column, true)}>
              {sprites[getSpriteNameForTile(tile)]}
            </TouchableScale>
          </View>
        ))}
      </View>
    );
  }

  render() {
    const {field} = this.props;
    return (
      <View style={styles.field}>
        <FlatList data={field.data} initialNumToRender={0} windowSize={1} maxToRenderPerBatch={fieldTiles}
                  renderItem={this.renderRow} keyExtractor={Field.getRowKey} getItemLayout={Field.getRowLayout}/>
      </View>
    );
  }
}
