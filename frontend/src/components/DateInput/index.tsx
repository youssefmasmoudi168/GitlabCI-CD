import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';

interface DateInputProps extends React.ComponentProps<typeof DatePicker> {
  value?: dayjs.Dayjs;
  defaultValue?: dayjs.Dayjs;
  onChange?: (date: dayjs.Dayjs) => void;
  label: string;
  name: string;
  control: any;
  required?: boolean;
}

const DateInput = (props: DateInputProps) => {
  const { value, onChange, label, name, control, required, defaultValue } =
    props;
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field }) => {
        return defaultValue ? (
          <DatePicker
            sx={{ width: '100%', marginY: 1 }}
            {...field}
            defaultValue={defaultValue}
            label={label}
          />
        ) : (
          <DatePicker
            sx={{ width: '100%', marginY: 1 }}
            {...field}
            onChange={onChange}
            value={value}
            label={label}
          />
        );
      }}
    />
  );
};

export default DateInput;
