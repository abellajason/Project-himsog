import {
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  message,
} from 'antd';

module.exports = {
  useFetchDataIds: function (fetchFunction, dependencies) {
    const [dataIds, setDataIds] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const fetchData = useCallback(async () => {
      try {
        setIsFetching(true);
        const result = await fetchFunction();
        if (result && result.data) {
          setDataIds(result.data.map(({_id}) => _id));
        } else {
          setDataIds(null);
        }
      } catch(error) {
        message.error(error.message);
      } finally {
        setIsFetching(false);
      }
    }, [fetchFunction]);

    useEffect(() => {
      fetchData();
    }, [fetchData]);

    return [dataIds, isFetching, setDataIds];
  },

  useRealTimeDataIds: function(service, event, handler, dependencies) {
    useEffect(() => {
      service.on(event, handler);
      return () => {
        service.removeListener(event, handler);
      }
    }, [dependencies, event, handler, service]);
  }
}
