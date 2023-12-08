'use client'
import { DataModel } from '@/models/DataModel';
import { LoadDataService } from '@/services/LoadDataService';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Pagination } from 'antd';
import clsx from 'clsx';
import { Menu as BaseMenu, MenuProps } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton, MenuButtonProps } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, MenuItemProps } from '@mui/base/MenuItem';
import { Dropdown } from '@mui/base/Dropdown';
import { useTheme } from '@mui/system';
function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}
import { IoIosMenu } from "react-icons/io";
import { IoGrid } from "react-icons/io5";
import { useSearchParams } from 'next/navigation';
import { LoadingComponent } from '@/components/LoadingComponent';
import Link from 'next/link';
import './styles.css'


export default function page() {
  const [data, setData] = useState<DataModel[]>([])
  const loadDataService = new LoadDataService
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [columns, setColumns] = useState(() => {
    // Get the number of columns from localStorage, default to 3 if not available
    const savedColumns = localStorage.getItem('columns');
    return savedColumns ? parseInt(savedColumns) : 3;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const searchParams = useSearchParams()
  const [isLoaded, setIsLoaded] = useState(false)
  const search = searchParams.get('search')

  useEffect(() => {
    localStorage.setItem('columns', columns.toString());
  }, [columns]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filteredData = data.filter((item) => {
      const itemTitle = item.title.toLowerCase();
      const searchTermLower = term.toLowerCase(); // Use the updated term here
      return itemTitle.includes(searchTermLower) || itemTitle === searchTermLower;
    });

    console.log(filteredData); // You can use the filteredData as needed
  };

  const handleColumnChange = (colCount: number) => {
    setColumns(colCount);
  };

  const handleSortDefault = () => {
    const sortedDataById = [...data].sort((a, b) => parseInt(a.id) - parseInt(b.id));
    setData(sortedDataById);
  };
  const handleSortByNameAscending = () => {
    const sortedDataByName = [...data].sort((a, b) => a.title.localeCompare(b.title));
    setData(sortedDataByName);
  };

  const handleSortByNameDescending = () => {
    const sortedDataByNameDescending = [...data].sort((a, b) => b.title.localeCompare(a.title));
    setData(sortedDataByNameDescending);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoaded(true)
        const res = await loadDataService.loadCSV();
        const filteredRes = res.filter(item => item.title); // Filter items with titles
        setData(filteredRes);
        setCurrentPage(1);
        setIsLoaded(false)
      } catch (error) {
        console.log('Error:', error);
        setIsLoaded(false)
      }
    };
    fetchData();
  }, []);

  // Calculate the current data slice based on currentPage and itemsPerPage
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;


  const filteredData = data.filter((item) => {
    const itemTitle = item.title.toLowerCase();
    const searchTermLower = search ? search.toLowerCase() : searchTerm.toLowerCase();
    return itemTitle.includes(searchTermLower) || itemTitle === searchTermLower;
  });

  const currentData = filteredData.slice(startIndex, endIndex);

  if (isLoaded) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <LoadingComponent />
      </div>)
  }

  return (
    <div className='max-w-7xl justify-center items-center mx-auto'>
      <div className={`flex justify-end gap-2`}>
        <Pagination
          className='flex justify-center items-center mx-auto'
          current={currentPage}
          pageSize={itemsPerPage}
          total={
            search === '' || search === null
              ? data.length // Show total length of all items when search is empty or null
              : filteredData.length // Show total length of filtered data when search is active
          }
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `Total ${total} items`}
          onChange={handlePageChange}
          onShowSizeChange={(current, pageSize) => {
            setCurrentPage(1); // Reset to the first page when changing the page size
            setItemsPerPage(pageSize); // Update the items per page
          }}
        />
        {/* <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearch}
        /> */}
        <Dropdown>
          <MenuButton>
            <IoIosMenu size={24} />
          </MenuButton>
          <Menu>
            <MenuItem
              onClick={handleSortDefault}
              style={{ cursor: 'pointer' }}>
              Defualt
            </MenuItem>
            <MenuItem
              className='cursor-pointer'
              style={{ cursor: 'pointer' }}
              onClick={handleSortByNameAscending}>
              A-Z
            </MenuItem>
            <MenuItem
              className='cursor-pointer'
              style={{ cursor: 'pointer' }}
              onClick={handleSortByNameDescending}>
              Z-A
            </MenuItem>
          </Menu>
        </Dropdown>
        <Dropdown>
          <MenuButton>
            <IoGrid size={24} />
          </MenuButton>
          <Menu >
            <MenuItem onClick={() => handleColumnChange(3)}
              style={{ cursor: 'pointer' }}>
              3 Columns
            </MenuItem>
            <MenuItem onClick={() => handleColumnChange(4)}
              style={{ cursor: 'pointer' }}>
              4 Columns
            </MenuItem>
            <MenuItem onClick={() => handleColumnChange(5)}
              style={{ cursor: 'pointer' }}>
              5 Columns
            </MenuItem>
          </Menu>
        </Dropdown>
      </div>
      <div className={`grid grid-cols-${columns} gap-5 mt-5`}>
        {currentData.map((item) => (
          <div key={item.title}>
            <Link
              href={`/recipe/${item.id}`}
              className='item'>
              <div className='item-content'>
                <img
                  className={`item-image ${columns == 4 ? 'h-[176.5px] w-[294.1px]' : columns == 5 ? 'h-[150px] w-[250px]' : 'h-[300px] w-[500px]'}} object-cover rounded-md`}
                  src={`food-images/${item.imageName}.jpg`}
                  alt={item.title}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "images/image-not-found.jpg"
                  }}
                />
                <p className={`${columns === 4 ? 'text-xl' : columns === 5 ? 'text-lg' : 'text-2xl'} font-bold mt-2`}>
                  {item.title}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Pagination
        className='my-10 flex justify-center items-center mx-auto'
        current={currentPage}
        pageSize={itemsPerPage}
        total={
          search === '' || search === null
            ? data.length // Show total length of all items when search is empty or null
            : filteredData.length // Show total length of filtered data when search is active
        }
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `Total ${total} items`}
        onChange={handlePageChange}
        onShowSizeChange={(current, pageSize) => {
          setCurrentPage(1); // Reset to the first page when changing the page size
          setItemsPerPage(pageSize); // Update the items per page
        }}
      />
    </div>
  )
}

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === 'function' ? fn(args) : fn;

const Menu = React.forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
  // Replace this with your app logic for determining dark modes
  const isDarkMode = useIsDarkMode();

  return (
    <BaseMenu
      ref={ref}
      {...props}
      slotProps={{
        ...props.slotProps,
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `${isDarkMode ? 'dark' : ''} z-10`,
              resolvedSlotProps?.className,
            ),
          };
        },
        listbox: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.listbox,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'text-sm box-border font-sans p-1.5 my-3 mx-0 rounded-xl overflow-auto outline-0 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-300 min-w-listbox shadow-md dark:shadow-slate-900',
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  );
});

const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  (props, ref) => {
    const { className, ...other } = props;
    return (
      <BaseMenuButton
        ref={ref}
        className={clsx(
          'cursor-pointer text-sm font-sans box-border rounded-lg font-semibold px-4 py-2 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200 hover:bg-slate-50 hover:dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 focus-visible:shadow-[0_0_0_4px_#ddd6fe] dark:focus-visible:shadow-[0_0_0_4px_#a78bfa] focus-visible:outline-none shadow-sm',
          className,
        )}
        {...other}
      />
    );
  },
);

const MenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>((props, ref) => {
  const { className, ...other } = props;
  return (
    <BaseMenuItem
      ref={ref}
      className={clsx(
        'list-none p-2 px-10 rounded-lg cursor-default select-none last-of-type:border-b-0 focus-visible:shadow-outline-purple focus-visible:outline-0 focus-visible:bg-slate-100 focus-visible:dark:bg-slate-800 focus-visible-text-slate-900 focus-visible:dark:text-slate-300 disabled:text-slate-400 disabled:dark:text-slate-700 disabled:hover:text-slate-400 disabled:hover:dark:text-slate-700 hover:bg-purple-50 hover:dark:bg-purple-950 hover:text-slate-900 hover:dark:text-slate-300',
        className,
      )}
      {...other}
    />
  );
});