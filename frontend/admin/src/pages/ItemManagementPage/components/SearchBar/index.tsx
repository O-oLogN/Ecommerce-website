import {Input, Button} from 'antd'
import {FilterOutlined} from '@ant-design/icons'
import React from "react";

interface SearchBarProps {
    onClick: () => void
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({onClick, onKeyDown}) => {
    return (
        <div style={{marginLeft: '500px', marginTop: '20px', marginBottom: '50px' }}>
            <Input type="text"
                   id="item-search-bar"
                   placeholder="Item name"
                   prefix={<FilterOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                   size="middle"
                   style={{width: 500}}
                   onKeyDown={onKeyDown}
            />
            <Button type="primary" 
                    htmlType="submit" 
                    style={{marginLeft: 20}} 
                    onClick={onClick}
            >
                Search
            </Button>
        </div>
    )
}