import React, { Component } from 'react';
import Draggable from 'react-draggable';
class BattleArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      rows: [0,1,2,3,4],
      cols: [0,1,2,3,4],
      shipSelected: false,
      selectable: false,
      selectedRow: null,
      selectedCol: null,
      horizontal: true,     
    }
  }
  mouseOver = (e) => {
    const { horizontal } = this.state;
    let selectedTabs ='';
    console.log(e.target.id)
    let val = (e.target.id).split('');
    this.setState({
      selectedRow: parseInt(val[0],10),
      selectedCol: parseInt(val[1],10)
    });
    if(horizontal) {
      if(parseInt(val[1],10) <= 2){     
        this.setState({selectable: true});
      }else { 
        this.setState({selectable: false});
      }
    }else {
      if(parseInt(val[0],10) <= 2){     
        this.setState({selectable: true});
      }else { 
        this.setState({selectable: false});
      }
    }
    
  }
  handleClick = (e) => {
    let val = parseInt(e.target.id, 10);
    const {horizontal, selectable} =  this.state;
    debugger;
    if(horizontal && selectable) {
      console.log(val,val+1,val+2);
    }else if(selectable){
      console.log(val,val+10,val+20)
    }

  }
  verticalSelection = (row) => {
    const {selectable, selectedRow} = this.state;
    if(selectable){
      if(selectedRow == row || selectedRow+1 == row || selectedRow+2 == row){
        return 'shipSelected';
      }else {
        return '';
      }
    }else if (selectedRow == row || selectedRow+1 == row){
        return 'shipUnselected';
    }
  }
  horizontalSelection = (col) => {
    const {selectable, selectedCol} = this.state;
    if(selectable){
      if(selectedCol == col || selectedCol+1 == col || selectedCol+2 == col){
        return 'shipSelected';
      }else {
        return '';
      }
    }else if (selectedCol == col || selectedCol+1 == col){
        return 'shipUnselected';
    }
  }
  cellDivs = (row) => {
    const {selectedRow, horizontal, selectedCol} = this.state;
    let selectedTabs ='';

    if(row == selectedRow && horizontal){
       return(
        this.state.cols.map((col,index) => {
          selectedTabs = this.horizontalSelection(col);
          return (
            <div className={`indent ${selectedTabs}`} id={`${row}${col}`} onMouseOver={this.mouseOver} key={`${row}${col}`} onClick={this.handleClick} > {`${row}${col}`}</div>
          )
        })
    ) 
      
    }
    else if(!horizontal){
      return(
        this.state.cols.map((col,index) => {
          if(selectedCol == col){
            selectedTabs = this.verticalSelection(row);
          }else {
            selectedTabs="";
          }
          return (
            <div className={`indent ${selectedTabs}`} id={`${row}${col}`} onMouseOver={this.mouseOver} key={`${row}${col}`} onClick={this.handleClick} > {`${row}${col}`}</div>
          )
        })
      ) 
    }
   return(
      this.state.cols.map((col,index) => {
        return (
          <div className={`indent ${selectedTabs}`} id={`${row}${col}`} onMouseOver={this.mouseOver} key={`${row}${col}`} onClick={this.handleClick} > {`${row}${col}`}</div>
        )
      })
    ) 
  }
  onShipSelect = () => {
    this.setState({
      shipSelected: !this.state.shipSelected,
      horizontal: !this.state.horizontal
    })
  }   
  render() {
    const {rows ,shipSelected, selectable} = this.state;
    let shipColor =  shipSelected ? 'shipSelected' : 'shipUnselected';
    let selectedTabs ='';
    return (
      <div className="App">
      {
        rows.map((row,index) => {
          return(
            <div className={`row`} key={row}>
              {this.cellDivs(row)}
            </div>
          )
        })
      }
     
      <div className={`ship ${shipColor}` } onClick={this.onShipSelect}>ship</div>
      
      
      </div>
    );
  } 
}
export default BattleArea; 