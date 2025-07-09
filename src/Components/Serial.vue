<template>
    <div id="serial_port_container">
    <n-select 
        v-model:value="serial.options.path"
        :options="port_options"
        id="serial_port_select"
        filterable
        tag
    />
    <n-select 
        v-model:value="serial.options.baudRate"
        :options="baudrate_options"
        id="baud_rate_select"
        filterable
        tag
    />
    <n-switch size="large" 
        :round="false" 
        v-model:value="serial_status" 
        @update:value= "toggleSerialPort"
        id="serial_port_open_button">
        <template #checked>
            {{ t('serial.open') }}
        </template>
        <template #unchecked>
            {{ t('serial.close') }}
        </template>
    </n-switch>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { SerialPort, DataBits, StopBits, FlowControl, Parity} from "tauri-plugin-serialplugin";
import { useI18n } from "vue-i18n";
import { useNotification } from "naive-ui";

const { t } = useI18n({ useScope: 'global' });
const notification = useNotification();
const port_options = ref<{ label: string, value: string }[]>([]);
const baudrate_options = ref<{ label: string, value: number }[]>([]);

const serial = ref(new SerialPort({
    path : "",
    baudRate: 115200,
    dataBits: DataBits.Eight, 
    flowControl: FlowControl.None,
    parity: Parity.None, 
    stopBits: StopBits.One,
    timeout: 1000,
    size: 1024
}));
const serial_status = ref(false);

function getLastNumber(str:string): number {
    const match = str.match(/(\d+)$/);
    return match ? parseInt(match[1], 10) : 0;
}

function showNotification(type: 'success' | 'warning' | 'error', title: string, message: string) {
    notification.create({
        type: type,
        title: title,
        content: message,
        duration: 2000,
    });
}

function toggleSerialPort() {
    if (serial_status.value) {
        if (serial.value.options.path === "") {
            console.error("No serial port selected.");
            return;
        }
        serial.value.open()
            .then(() => {
                console.log("Serial port opened successfully:", serial.value.options.path);
                serial_status.value = true;
            })
            .catch((err) => {
                console.warn("Error opening serial port:", err);
                serial_status.value = false;
                showNotification('error', t('serial.error_title'), t('serial.error_message'));
            });
    } else {
        serial.value?.close()
            .then(() => {
                console.log("Serial port closed successfully:", serial.value.options.path);
                serial_status.value = false;
            })
            .catch((err) => {
                console.error("Error closing serial port:", err);
            });
    }
}

onMounted(async() => {
    try {
        const ports = await SerialPort.available_ports();
        // console.log("Available serial ports:", ports.value);
        const keys = Object.keys(ports).sort((a, b) => {
            return getLastNumber(a) - getLastNumber(b);
        });
        serial.value.options.path = keys.length > 0 ? keys[0] : "";
        port_options.value = keys.map((key) => {
            return { label: key, value: key };
        });

        const baudrates = [9600, 19200, 38400, 57600, 115200, 230400, 460800, 921600];
        baudrate_options.value = baudrates.map((baud) => {
            return { label: baud.toString(), value: baud };
        });
    } catch (err) {
        // console.error("Error fetching serial ports:", err);
    }
});


</script>

<style scoped>
#serial_port_container {
    display: inline-flex;
    align-items: center;
}

#serial_port_select, #baud_rate_select{
    width: 100px;
    text-align: left;
}

#serial_port_select, #serial_port_open_button, #baud_rate_select{
    margin-left: 1rex;
}

</style>