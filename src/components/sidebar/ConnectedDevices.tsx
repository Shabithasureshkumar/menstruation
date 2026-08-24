import React from 'react';
import { Watch, Thermometer, Scale as ScaleIcon, Check, RefreshCw } from 'lucide-react';
import type { ConnectedDevice } from '../../types/dailyLog';

interface ConnectedDevicesProps {
  devices: ConnectedDevice[];
  onSyncDevice: (deviceId: string) => void;
}

export const ConnectedDevices: React.FC<ConnectedDevicesProps> = ({
  devices,
  onSyncDevice,
}) => {
  const getDeviceIcon = (type: ConnectedDevice['type']) => {
    switch (type) {
      case 'watch':
        return <Watch className="w-4 h-4 text-[#A855F7]" />;
      case 'thermometer':
        return <Thermometer className="w-4 h-4 text-[#A855F7]" />;
      case 'scale':
        return <ScaleIcon className="w-4 h-4 text-[#A855F7]" />;
      default:
        return <Watch className="w-4 h-4 text-[#A855F7]" />;
    }
  };

  return (
    <div className="w-full space-y-2.5">
      <h3 className="text-[0.98rem] font-bold text-[#1F2937] tracking-tight">
        Connected Devices
      </h3>

      <div className="space-y-2">
        {devices.map((device) => (
          <div
            key={device.id}
            onClick={() => onSyncDevice(device.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSyncDevice(device.id);
              }
            }}
            aria-label={`Sync ${device.name}`}
            className="flex items-center justify-between p-3 rounded-2xl bg-[#F9FAFB] border border-[#F3F4F6] hover:border-purple-200 transition-all cursor-pointer group shadow-2xs"
          >
            {/* Left side: Icon + Name */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#F3E8FF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                {getDeviceIcon(device.type)}
              </div>
              <span className="text-xs sm:text-sm font-medium text-[#374151] truncate">
                {device.name}
              </span>
            </div>

            {/* Right side: Sync Status + Check */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[0.72rem] font-semibold text-[#16A34A]">
                {device.isSyncing ? 'Syncing...' : device.syncedText}
              </span>
              <div className="w-4 h-4 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#16A34A]">
                {device.isSyncing ? (
                  <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                ) : (
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
