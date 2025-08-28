import { useState, useRef } from 'react';
import { Button } from './ui/Button';
import { Upload, Image, Video, FileText, Music, X } from 'lucide-react';

const getMediaIcon = (type) => {
  switch (type) {
    case 'IMAGE': return <Image size={16} />;
    case 'VIDEO': return <Video size={16} />;
    case 'AUDIO': return <Music size={16} />;
    case 'DOCUMENT': return <FileText size={16} />;
    default: return <Upload size={16} />;
  }
};

const getFileType = (file) => {
  const type = file.type;
  if (type.startsWith('image/')) return 'IMAGE';
  if (type.startsWith('video/')) return 'VIDEO';
  if (type.startsWith('audio/')) return 'AUDIO';
  return 'DOCUMENT';
};

export const MediaUpload = ({ onUpload, loading, className = '' }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const fileType = getFileType(selectedFile);
      onUpload(selectedFile, caption, fileType);
      setSelectedFile(null);
      setCaption('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setCaption('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {!selectedFile ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="w-full cyber-glass border-neon-blue/30 hover:border-neon-blue"
        >
          <Upload size={16} className="mr-2" />
          <span className="font-mono">UPLOAD_MEDIA</span>
        </Button>
      ) : (
        <div className="cyber-glass p-4 rounded-lg border border-neon-blue/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              {getMediaIcon(getFileType(selectedFile))}
              <span className="text-sm font-mono text-neon-blue truncate max-w-40">
                {selectedFile.name}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="text-neon-red hover:text-neon-red"
            >
              <X size={16} />
            </Button>
          </div>
          
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add caption (optional)..."
            className="w-full bg-transparent border border-neon-blue/30 rounded px-3 py-2 text-sm font-mono text-neon-blue placeholder-neon-blue/50 focus:border-neon-blue focus:outline-none"
          />
          
          <div className="flex space-x-2 mt-3">
            <Button
              onClick={handleUpload}
              loading={loading}
              size="sm"
              className="flex-1"
            >
              TRANSMIT
            </Button>
            <Button
              onClick={handleCancel}
              variant="secondary"
              size="sm"
            >
              CANCEL
            </Button>
          </div>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
        className="hidden"
      />
    </div>
  );
};
