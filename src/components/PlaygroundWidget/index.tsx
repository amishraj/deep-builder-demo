import React from "react";

import "./index.scss";
import { Container, Button, Input } from "semantic-ui-react";

export interface PlaygroundWidgetProps {
    renderAvailableOps: () => any;
    renderCanvasWidget: (className?: string) => any;
    handleAddNode: (name: string, args: any, color: string, event: any) => any;
    handleAddPresetModel: (data: any) => any;
    renderLoader: () => any;
    addPreset: (name: string) => any;
}
export interface PlaygroundWidgetState {
    name: string;
}

export const PlaygroundWidget: React.FC<PlaygroundWidgetProps> = props => {
    const [state, setState] = React.useState<PlaygroundWidgetState>({ name: "" })
    const handleDrop = (event: any) => {
        if (event.dataTransfer.getData('ops-node')) {
            const data = JSON.parse(event.dataTransfer.getData('ops-node'));
            props.handleAddNode(data.name, data.args, data.color, event);
            return;
        }
        let data = JSON.parse(event.dataTransfer.getData('model-node'));
        if (data.data)  data = JSON.parse(data.data)
        
        props.handleAddPresetModel(data);
    }
    const handleName = (e:any) => {
        console.log(e.target.value);
        setState({ name: e.target.value })
    }

    return (
        <Container fluid className="playground-widget">
            <div className="playground-widget__container">
                { props.renderAvailableOps() }
                <div
                    onDrop={handleDrop}
                    onDragOver={event => {
                        event.preventDefault();
                    }}
                    className="playground-widget__content"
                >
                    { props.renderLoader() }
                    { props.renderCanvasWidget("playground-widget--canvas-wrapper") }
                </div>
            </div>
            <Input label="model name" onChange={handleName} />
            <Button onClick={(e) => props.addPreset(state.name)}>Meep</Button>
        </Container>
    )
}