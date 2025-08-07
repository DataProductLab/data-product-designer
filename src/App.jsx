// AsyncAPI DnD YAML Generator - Basic Version
// Using React, dnd-kit, and js-yaml

import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import yaml from "js-yaml";

const BLOCK_TYPES = ["info", "server", "channel", "message"];

const BlockPalette = ({ onAddBlock }) => (
  <div className="p-4 border rounded mb-4">
    <h2 className="text-lg font-bold mb-2">Block Palette</h2>
    {BLOCK_TYPES.map((type) => (
      <button
        key={type}
        onClick={() => onAddBlock(type)}
        className="mr-2 mb-2 px-3 py-1 bg-blue-500 text-white rounded"
      >
        Add {type}
      </button>
    ))}
  </div>
);

const SortableBlock = ({ id, data, onChange }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(id, { ...data, [name]: value });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 border rounded mb-2 bg-white"
    >
      <strong>{data.type.toUpperCase()}</strong>
      <div className="mt-2">
        {Object.entries(data.fields).map(([field, val]) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={data[field] || ""}
            onChange={handleInputChange}
            className="block w-full mb-1 px-2 py-1 border rounded"
          />
        ))}
      </div>
    </div>
  );
};

const getDefaultFields = (type) => {
  switch (type) {
    case "info":
      return { title: "", version: "" };
    case "server":
      return { url: "", protocol: "" };
    case "channel":
      return { name: "", description: "" };
    case "message":
      return { name: "", payload: "" };
    default:
      return {};
  }
};

export default function App() {
  const [blocks, setBlocks] = useState([]);

  const addBlock = (type) => {
    const id = `${type}-${Date.now()}`;
    const fields = getDefaultFields(type);
    setBlocks((prev) => [...prev, { id, type, fields, ...fields }]);
  };

  const updateBlock = (id, updatedData) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, ...updatedData } : block))
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      setBlocks((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  const generateYAML = () => {
    const doc = {
      asyncapi: "2.6.0",
    };
    blocks.forEach((block) => {
      switch (block.type) {
        case "info":
          doc.info = {
            title: block.title,
            version: block.version
          };
          break;
        case "server":
          doc.servers = {
            myServer: {
              url: block.url,
              protocol: block.protocol
            }
          };
          break;
        case "channel":
          doc.channels = {
            [block.name || "myChannel"]: {
              description: block.description
            }
          };
          break;
        case "message":
          doc.components = doc.components || {};
          doc.components.messages = {
            [block.name || "myMessage"]: {
              payload: block.payload
            }
          };
          break;
        default:
          break;
      }
    });
    const yamlString = yaml.dump(doc);
    const blob = new Blob([yamlString], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "asyncapi.yaml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AsyncAPI DnD YAML Generator</h1>
      <BlockPalette onAddBlock={addBlock} />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
          {blocks.map((block) => (
            <SortableBlock
              key={block.id}
              id={block.id}
              data={block}
              onChange={updateBlock}
            />
          ))}
        </SortableContext>
      </DndContext>

      <button
        onClick={generateYAML}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Generate & Download YAML
      </button>
    </div>
  );
}
