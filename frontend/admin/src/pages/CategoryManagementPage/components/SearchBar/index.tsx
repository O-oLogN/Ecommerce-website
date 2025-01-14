import {Input, Button} from 'antd'
import {FilterOutlined} from '@ant-design/icons'

interface SearchBarProps {
    onClick: () => void
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({onClick, onKeyDown}) => {
    return (
        <div style={{ position: 'absolute', right: 20, top: 100}}>
            <Input type="text"
                   id="category-search-bar"
                   placeholder="Categoryname"
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